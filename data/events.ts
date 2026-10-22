import AsyncStorage from "@react-native-async-storage/async-storage";

export const EVENTS_URL = "https://sda-songs-app.github.io/songs_app_fe/events.json";

const CACHE_KEY = "events:cache";
const DISMISSED_KEY = "events:dismissed";
const FETCH_TIMEOUT_MS = 6000;
const MAX_BODY_CHARS = 100_000;
const MAX_EVENTS = 5;
const MAX_TITLE_CHARS = 120;
const MAX_DESCRIPTION_CHARS = 600;
const MAX_SHORT_CHARS = 80;

const ALLOWED_LINK_HOSTS = new Set([
  "t.me",
  "sda-songs-app.github.io",
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
]);
const ALLOWED_IMAGE_HOSTS = new Set(["sda-songs-app.github.io"]);

export type LocalizedText = Record<string, string>;
export type EventDisplay = "banner" | "popup" | "both";

export type EventAnnouncement = {
  id: string;
  startsAt: string;
  endsAt: string;
  eventDate?: string;
  title: LocalizedText;
  description: LocalizedText;
  location?: LocalizedText;
  linkLabel?: LocalizedText;
  imageUrl?: string;
  linkUrl?: string;
  accentColor?: string;
  display: EventDisplay;
};

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

function parseLocalized(value: unknown, maxChars: number): LocalizedText | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const result: LocalizedText = {};
  for (const [key, text] of Object.entries(value as Record<string, unknown>)) {
    if (typeof text !== "string") continue;
    const trimmed = text.trim();
    if (trimmed && trimmed.length <= maxChars) result[key] = trimmed;
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function safeHttpsUrl(value: unknown, allowedHosts: Set<string>): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname.toLowerCase())) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function parseDateOnly(value: string, endOfDay = false): Date | null {
  if (!DATE_ONLY.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = endOfDay
    ? new Date(year, month - 1, day, 23, 59, 59)
    : new Date(year, month - 1, day, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseEvent(raw: unknown): EventAnnouncement | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const id = typeof record.id === "string" ? record.id.trim() : "";
  if (!id || id.length > 80) return null;

  const startsAt = typeof record.startsAt === "string" ? record.startsAt : "";
  const endsAt = typeof record.endsAt === "string" ? record.endsAt : "";
  if (!parseDateOnly(startsAt) || !parseDateOnly(endsAt, true)) return null;

  const title = parseLocalized(record.title, MAX_TITLE_CHARS);
  const description = parseLocalized(record.description, MAX_DESCRIPTION_CHARS);
  if (!title || !description) return null;

  const display: EventDisplay =
    record.display === "banner" || record.display === "popup" ? record.display : "both";

  const eventDate =
    typeof record.eventDate === "string" && parseDateOnly(record.eventDate) ? record.eventDate : undefined;

  return {
    id,
    startsAt,
    endsAt,
    eventDate,
    title,
    description,
    location: parseLocalized(record.location, MAX_SHORT_CHARS),
    linkLabel: parseLocalized(record.linkLabel, MAX_SHORT_CHARS),
    imageUrl: safeHttpsUrl(record.imageUrl, ALLOWED_IMAGE_HOSTS),
    linkUrl: safeHttpsUrl(record.linkUrl, ALLOWED_LINK_HOSTS),
    accentColor:
      typeof record.accentColor === "string" && HEX_COLOR.test(record.accentColor)
        ? record.accentColor
        : undefined,
    display,
  };
}

export function parseEventsPayload(text: string): EventAnnouncement[] {
  if (text.length > MAX_BODY_CHARS) return [];
  try {
    const payload = JSON.parse(text) as { events?: unknown };
    if (!payload || !Array.isArray(payload.events)) return [];
    return payload.events
      .map(parseEvent)
      .filter((event): event is EventAnnouncement => event !== null)
      .slice(0, MAX_EVENTS);
  } catch {
    return [];
  }
}

export function isActive(event: EventAnnouncement, now: Date = new Date()): boolean {
  const start = parseDateOnly(event.startsAt);
  const end = parseDateOnly(event.endsAt, true);
  return !!start && !!end && now >= start && now <= end;
}

/** Text for the selected language, else the "default" entry, else nothing (event is hidden). */
export function pickText(map: LocalizedText | undefined, language: string): string {
  if (!map) return "";
  return map[language] ?? map.default ?? "";
}

export async function loadCachedEvents(): Promise<EventAnnouncement[]> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? parseEventsPayload(raw) : [];
  } catch {
    return [];
  }
}

/** Returns the freshly downloaded events, or null when the download failed. */
export async function fetchEvents(): Promise<EventAnnouncement[] | null> {
  // Development builds read the local file so edits show up without publishing.
  if (__DEV__) {
    return parseEventsPayload(JSON.stringify(require("../docs/events.json")));
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${EVENTS_URL}?t=${Date.now()}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const text = await response.text();
    const events = parseEventsPayload(text);
    await AsyncStorage.setItem(CACHE_KEY, text.length <= MAX_BODY_CHARS ? text : "{}").catch(() => {});
    return events;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function loadDismissedEventIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(DISMISSED_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export async function saveDismissedEventIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(DISMISSED_KEY, JSON.stringify(ids.slice(-50)));
  } catch {}
}

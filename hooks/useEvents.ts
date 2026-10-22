import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EventAnnouncement,
  fetchEvents,
  isActive,
  loadCachedEvents,
  loadDismissedEventIds,
  pickText,
  saveDismissedEventIds,
} from "@/data/events";

export function useEvents(language: string) {
  const [events, setEvents] = useState<EventAnnouncement[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [cached, dismissedIds] = await Promise.all([loadCachedEvents(), loadDismissedEventIds()]);
      if (cancelled) return;
      setEvents(cached);
      setDismissed(dismissedIds);
      setReady(true);
      const fresh = await fetchEvents();
      if (!cancelled && fresh) setEvents(fresh);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => events.filter((event) => isActive(event) && pickText(event.title, language) !== ""),
    [events, language]
  );

  const banners = useMemo(
    () => visible.filter((event) => event.display !== "popup").slice(0, 2),
    [visible]
  );

  const popup = useMemo(
    () =>
      ready
        ? visible.find((event) => event.display !== "banner" && !dismissed.includes(event.id)) ?? null
        : null,
    [ready, visible, dismissed]
  );

  const dismissPopup = useCallback((id: string) => {
    setDismissed((previous) => {
      const next = previous.includes(id) ? previous : [...previous, id];
      void saveDismissedEventIds(next);
      return next;
    });
  }, []);

  return { banners, popup, dismissPopup };
}

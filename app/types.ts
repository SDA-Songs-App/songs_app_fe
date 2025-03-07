import React from "react";

type RootStackParams = {
  Home: undefined;
  Navbar: undefined;
  FontSettings: undefined;
  settings: undefined;
};
type RooStackSettingsParams = {
  settings: undefined;
};

type Song = {
  id: number;
  song_num: number;
  date?: string;
  title: string;
  chorus: string;
  category: string;
  artist: string;
  verse_1?: string;
  verse_2?: string;
  verse_3?: string;
  verse_4?: string;
  verse_5?: string;
  verse_6?: string;
  verse_7?: string;
  language_value: string;
  displayOrder?: number;
};

const MyComponent: React.FC = () => {
  // Your component's logic here
  return null;
};

export { RootStackParams, RooStackSettingsParams, Song };
export default MyComponent;

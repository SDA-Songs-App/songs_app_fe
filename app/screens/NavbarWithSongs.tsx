import React from "react";
import { SongProvider } from "@/lyricsContext/context";
import NavbarScreen from "@/components/navbar";

const NavbarWithSongs = (props: any) => {
  return (
    <SongProvider>
      <NavbarScreen {...props} />
    </SongProvider>
  );
};

export default NavbarWithSongs;

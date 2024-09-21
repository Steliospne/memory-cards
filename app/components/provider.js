"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Footer from "./footer";
import { settings as localSettings } from "../lib/data";
import clickSound from "@/public/assets/click.mp3";
import bgMusic from "@/public/assets/background-music.mp3";

const SettingsContext = createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

function Provider({ children }) {
  const [settings, setSettings] = useState(localSettings);
  const [clickAudio, setClickAudio] = useState(null);
  const [bgAudio, setBgAudio] = useState(null);

  useEffect(() => {
    setClickAudio(new Audio(clickSound));
    setBgAudio(new Audio(bgMusic));
  }, []);

  const handleSettingsChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: !settings[event.target.name],
    });
    playClick(settings.sound_effects);
  };

  const playClick = (soundEffects) => {
    if (clickAudio) {
      clickAudio.volume = 0.07;
      soundEffects && clickAudio.play();
    }
  };

  const playMusic = (music) => {
    if (bgAudio) {
      bgAudio.volume = 0.1;
      bgAudio.loop = true;
      music ? bgAudio.play() : bgAudio.pause();
    }
  };
  playMusic(settings.music);
  return (
    <SettingsContext.Provider value={{ settings, playClick }}>
      {children}
      <Footer onChange={handleSettingsChange}></Footer>
    </SettingsContext.Provider>
  );
}

export default Provider;

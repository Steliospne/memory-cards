"use client";
import Link from "next/link";
import { capitalize, playClick } from "../lib/functions";
import Image from "next/image";
import backButtonLogo from "@/public/assets/arrow.png";
import { useSettings } from "../components/provider";

export default function Game({ searchParams }) {
  const { settings, playClick } = useSettings();
  return (
    <main>
      <h1>This is the Game Page in {capitalize(searchParams.mode)}</h1>
      <Link
        onClick={() => playClick(settings.sound_effects)}
        className='back-btn'
        href={"/"}
      >
        Back
        <Image alt='back button logo' width={64} src={backButtonLogo} />
      </Link>
    </main>
  );
}

"use client";
import Image from "next/image";
import logo from "@/public/assets/logo-L.png";
import Link from "next/link";
import { useSettings } from "./components/provider";

export default function Home() {
  const { settings, playClick } = useSettings();
  const handleLinkClick = () => playClick(settings.sound_effects);
  return (
    <main>
      <Image className='logo' width={750} alt='logo' src={logo} />
      <div className='btn-wrapper'>
        <Link
          onClick={handleLinkClick}
          href={{ pathname: "/game", query: { mode: "easy" } }}
        >
          Easy
        </Link>
        <Link
          onClick={handleLinkClick}
          href={{ pathname: "/game", query: { mode: "medium" } }}
        >
          Medium
        </Link>
        <Link
          onClick={handleLinkClick}
          href={{ pathname: "/game", query: { mode: "hard" } }}
        >
          Hard
        </Link>
      </div>
    </main>
  );
}

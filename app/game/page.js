import Link from "next/link";
import { capitalize } from "../lib/functions";
import Image from "next/image";
import backButtonLogo from "@/public/assets/arrow.png";

export default function Game({ searchParams }) {
  return (
    <main>
      <h1>This is the Game Page in {capitalize(searchParams.mode)}</h1>
      <Link className='back-btn' href={"/"}>
        Back
        <Image alt='back button logo' width={64} src={backButtonLogo} />
      </Link>
    </main>
  );
}

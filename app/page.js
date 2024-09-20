import Image from "next/image";
import logo from "@/public/assets/logo-L.png";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Image className='logo' width={750} alt='logo' src={logo} />
      <div className='btn-wrapper'>
        <Link href={{ pathname: "/game", query: { mode: "easy" } }}>Easy</Link>
        <Link href={{ pathname: "/game", query: { mode: "medium" } }}>
          Medium
        </Link>
        <Link href={{ pathname: "/game", query: { mode: "hard" } }}>Hard</Link>
      </div>
    </main>
  );
}

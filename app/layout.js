import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
import { list } from "@vercel/blob";

const frizQuadrata = localFont({
  src: "./fonts/Friz_Quadrata_Regular.ttf",
  variable: "--font-fritz-quadrata",
  weight: "100 900",
});

export const metadata = {
  title: "Memory Legends",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${frizQuadrata.variable}`}>
        {children}
        <footer>FOOTER</footer>
        <Suspense fallback={<p>Loading...</p>}>
          <Video fileName='memory-cards-bg-d1NjGs1Y0KlaO1oHv2OTnLTkK3Suai.mp4' />
        </Suspense>
      </body>
    </html>
  );
}

async function Video({ fileName }) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  });
  const { url } = blobs[0];
  return (
    <video autoPlay loop muted>
      <source src={url} type='video/mp4' />
    </video>
  );
}

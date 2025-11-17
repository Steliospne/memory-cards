import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Directory to save images
const OUTPUT_DIR = path.resolve('champion_splashes');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// URL for champion list
const CHAMPIONS_URL =
  'https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion.json';

// Base URL for loading screen splashes
const SPLASH_URL_BASE =
  'https://ddragon.leagueoflegends.com/cdn/img/champion/loading';

async function getChampionList() {
  const res = await fetch(CHAMPIONS_URL);
  const data = await res.json();
  return Object.keys(data.data); // Champion names
}

async function downloadSplash(champion, index) {
  const url = `${SPLASH_URL_BASE}/${champion}_${index}.jpg`;
  const res = await fetch(url);

  if (res.status === 200) {
    const buffer = await res.arrayBuffer();
    const filePath = path.join(OUTPUT_DIR, `${champion}_${index}.jpg`);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Downloaded: ${champion}_${index}.jpg`);
    return true;
  } else if (res.status === 404) {
    return false; // No more splashes
  } else {
    console.log(`Error ${res.status} for ${champion}_${index}.jpg`);
    return false;
  }
}

async function downloadAllSplashes() {
  const champions = await getChampionList();

  for (const champ of champions) {
    // console.log(`\nDownloading splashes for: ${champ}`);
    console.log(champ);
    // await downloadSplash(champ, 0);
  }
}

downloadAllSplashes();

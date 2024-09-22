import { v4 as uuid } from "uuid";

import bard from "@/public/assets/champions/Bard_0.jpg";
import rakan from "@/public/assets/champions/Rakan_0.jpg";
import ivern from "@/public/assets/champions/Ivern_0.jpg";
import morgana from "@/public/assets/champions/Morgana_0.jpg";
import kindred from "@/public/assets/champions/Kindred_0.jpg";
import nami from "@/public/assets/champions/Nami_0.jpg";
import varus from "@/public/assets/champions/Varus_0.jpg";
import lillia from "@/public/assets/champions/Lillia_0.jpg";
import viego from "@/public/assets/champions/Viego_0.jpg";
import xayah from "@/public/assets/champions/Xayah_0.jpg";

export const settings = {
  music: false,
  sound_effects: true,
};

export const champions = [
  {
    id: uuid(),
    img: bard,
    name: "Bard",
    clicked: false,
  },
  {
    id: uuid(),
    img: rakan,
    name: "Rakan",
    clicked: false,
  },
  {
    id: uuid(),
    img: ivern,
    name: "Ivern",
    clicked: false,
  },
  {
    id: uuid(),
    img: morgana,
    name: "Morgana",
    clicked: false,
  },
  {
    id: uuid(),
    img: kindred,
    name: "Kindred",
    clicked: false,
  },
  {
    id: uuid(),
    img: nami,
    name: "Nami",
    clicked: false,
  },
  {
    id: uuid(),
    img: varus,
    name: "Varus",
    clicked: false,
  },
  {
    id: uuid(),
    img: lillia,
    name: "Lillia",
    clicked: false,
  },
  {
    id: uuid(),
    img: viego,
    name: "Viego",
    clicked: false,
  },
  {
    id: uuid(),
    img: xayah,
    name: "Xayah",
    clicked: false,
  },
];

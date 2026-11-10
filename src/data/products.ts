import type { ImageMetadata } from "astro";
import coyote from "../assets/images/coyote.png";
import greySport from "../assets/images/grey-sport.png";
import redRunner from "../assets/images/red-runner.png";
import tarmac from "../assets/images/tarmac.png";
import suedeLoafer from "../assets/images/suede-loafer.png";
import whiteTrail from "../assets/images/white-trail.png";

export type Category = "women" | "men";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  type: string;
  price: number;
  tile: string;
  image: ImageMetadata;
  tag?: string;
  blurb: string;
  description: string;
  details: string[];
  sizes: number[];
}

const BEIGE = "hsl(31 42% 84%)";
const YELLOW = "hsl(53 72% 82%)";
const STONE = "hsl(40 14% 88%)";

const WOMEN_SIZES = [36, 37, 38, 39, 40, 41];
const MEN_SIZES = [40, 41, 42, 43, 44, 45, 46];

export const products: Product[] = [
  {
    slug: "riot-chunk",
    name: "Riot Chunk",
    category: "women",
    type: "Running",
    price: 189,
    tile: YELLOW,
    image: redRunner,
    tag: "New",
    blurb: "Loud laces, louder sole.",
    description:
      "A stacked runner that refuses to blend in. Layered mesh and suede panels sit on a triple-density sole, so it looks heavy and walks light.",
    details: [
      "Layered mesh and suede upper",
      "Triple-density cushioned sole",
      "Padded collar with heel pull tab",
      "Fits true to size",
    ],
    sizes: WOMEN_SIZES,
  },
  {
    slug: "coyote-ridge",
    name: "Coyote Ridge",
    category: "men",
    type: "Trail",
    price: 148,
    tile: BEIGE,
    image: coyote,
    blurb: "Built for gravel, fine on pavement.",
    description:
      "A low-cut trail shoe in washed coyote canvas. The lugged outsole grips loose ground, and the reinforced toe shrugs off whatever you kick.",
    details: [
      "Ripstop canvas upper",
      "Lugged rubber outsole",
      "Reinforced toe cap",
      "Fits slightly large — consider half a size down",
    ],
    sizes: MEN_SIZES,
  },
  {
    slug: "static-air",
    name: "Static Air",
    category: "women",
    type: "Lifestyle",
    price: 164,
    tile: STONE,
    image: greySport,
    tag: "Bestseller",
    blurb: "Greyscale, turned all the way up.",
    description:
      "Wavy gradient panels fade from white to charcoal over a visible air unit. The everyday pair that goes with everything you already own.",
    details: [
      "Breathable mesh with layered overlays",
      "Visible air cushioning",
      "Rubber waffle outsole",
      "Fits true to size",
    ],
    sizes: WOMEN_SIZES,
  },
  {
    slug: "tarmac-low",
    name: "Tarmac Low",
    category: "men",
    type: "Running",
    price: 124,
    tile: YELLOW,
    image: tarmac,
    blurb: "The retro runner, in asphalt.",
    description:
      "A slim seventies-style runner in two tones of grey. Light enough for a morning five-K, clean enough for the office after.",
    details: [
      "Nylon and suede upper",
      "EVA wedge midsole",
      "Gum rubber outsole",
      "Fits true to size",
    ],
    sizes: MEN_SIZES,
  },
  {
    slug: "whiteout-trail",
    name: "Whiteout Trail",
    category: "women",
    type: "Trail",
    price: 156,
    tile: BEIGE,
    image: whiteTrail,
    tag: "New",
    blurb: "All white. Mud is optional.",
    description:
      "A tonal white trail shoe on a contrast black lug sole. Water-resistant, easy to wipe down, and built to be taken off the pavement.",
    details: [
      "Water-resistant coated upper",
      "Deep-lug black outsole",
      "Speed lacing with heel loop",
      "Fits true to size",
    ],
    sizes: WOMEN_SIZES,
  },
  {
    slug: "slow-sunday",
    name: "Slow Sunday",
    category: "men",
    type: "Loafer",
    price: 172,
    tile: STONE,
    image: suedeLoafer,
    blurb: "A tassel loafer for unhurried days.",
    description:
      "Chocolate suede, hand-stitched apron and a soft leather lining. Dressed up or sockless — it works both ways.",
    details: [
      "Full suede upper",
      "Leather lining and insole",
      "Stitched leather sole with rubber heel",
      "Fits narrow — consider half a size up",
    ],
    sizes: MEN_SIZES,
  },
];

export const formatPrice = (value: number) => `$${value.toFixed(0)}`;

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);

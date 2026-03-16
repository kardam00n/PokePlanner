import fs from "fs";
import path from "path";
import type { Pokemon, TypeChart } from "./types";

/**
 * Loads the static Pokémon list and Type Chart JSON data.
 * This should only be called from Server Components inside the app directory (e.g. page.tsx).
 */
export function loadStaticData(): { pokemonList: Pokemon[]; typeChart: TypeChart } {
  const dataDir = path.join(process.cwd(), "public", "data");
  
  const pokemonList: Pokemon[] = JSON.parse(
    fs.readFileSync(path.join(dataDir, "pokemon-list.json"), "utf-8")
  );
  
  const typeChart: TypeChart = JSON.parse(
    fs.readFileSync(path.join(dataDir, "type-chart.json"), "utf-8")
  );
  
  return { pokemonList, typeChart };
}

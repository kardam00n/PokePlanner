import type { Pokemon, TypeChart } from "@/lib/types";
import TeamPicker from "./TeamPicker";
import { loadStaticData } from "@/lib/data-loader";

export default function Home() {
  const { pokemonList, typeChart } = loadStaticData();

  return (
    <TeamPicker pokemonList={pokemonList} typeChart={typeChart} />
  );
}

import { loadStaticData } from "@/lib/data-loader";
import TypeAnalyzer from "./TypeAnalyzer";

export const metadata = {
  title: "Type Analyzer - Pokémon Team Picker",
  description: "Quickly glance at a Pokémon's defensive and offensive type matchups.",
};

export default function TypeAnalyzerPage() {
  const { pokemonList, typeChart } = loadStaticData();

  return <TypeAnalyzer pokemonList={pokemonList} typeChart={typeChart} />;
}

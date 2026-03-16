import { loadStaticData } from "@/lib/data-loader";
import CounterAnalyzer from "./CounterAnalyzer";

export const metadata = {
  title: "Counter Analyzer - PokePlanner",
  description: "Quickly glance at a Pokémon's defensive and offensive type matchups.",
};

export default function TypeAnalyzerPage() {
  const { pokemonList, typeChart } = loadStaticData();

  return <CounterAnalyzer pokemonList={pokemonList} typeChart={typeChart} />;
}

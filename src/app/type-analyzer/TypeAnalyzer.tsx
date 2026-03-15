"use client";

import { useState, useMemo } from "react";
import type { Pokemon, TypeChart } from "@/lib/types";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./TypeAnalyzer.module.css";
import Image from "next/image";

interface TypeAnalyzerProps {
  pokemonList: Pokemon[];
  typeChart: TypeChart;
}

const ALL_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

function calculateDefensiveMatchups(pokemonTypes: string[], typeChart: TypeChart) {
  const matchups: Record<string, number> = {};
  for (const t of ALL_TYPES) matchups[t] = 1;

  for (const pokeType of pokemonTypes) {
    const relations = typeChart[pokeType];
    if (!relations) continue;

    for (const t of relations.double_damage_from) matchups[t] *= 2;
    for (const t of relations.half_damage_from) matchups[t] *= 0.5;
    for (const t of relations.no_damage_from) matchups[t] *= 0;
  }
  return matchups;
}

export default function TypeAnalyzer({ pokemonList, typeChart }: TypeAnalyzerProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const defensiveMatchups = useMemo(() => {
    if (!selectedPokemon) return null;
    return calculateDefensiveMatchups(selectedPokemon.types, typeChart);
  }, [selectedPokemon, typeChart]);

  const groups = useMemo(() => {
    if (!defensiveMatchups) return null;
    const g: Record<number, string[]> = { 4: [], 2: [], 1: [], 0.5: [], 0.25: [], 0: [] };
    for (const [t, m] of Object.entries(defensiveMatchups)) {
      if (g[m]) g[m].push(t);
    }
    return g;
  }, [defensiveMatchups]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="animate-slide-up">Type Matchup Analyzer</h1>
        <p className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Search for a Pokémon to view its defensive weaknesses and resistances.
        </p>
      </header>

      <div className={styles.searchSection}>
        <SearchBar
          pokemonList={pokemonList}
          team={[]}
          onAdd={setSelectedPokemon}
        />
      </div>

      {selectedPokemon && groups && (
        <div className={`${styles.results} animate-fade-in`}>
          <div className={styles.pokemonCard}>
            {selectedPokemon.sprite && (
              <Image 
                src={selectedPokemon.sprite} 
                alt={selectedPokemon.displayName} 
                width={80} height={80} 
                className={styles.pkmSprite}
                unoptimized
              />
            )}
            <div className={styles.pkmDetails}>
              <h2>{selectedPokemon.displayName}</h2>
              <div className={styles.pkmTypes}>
                {selectedPokemon.types.map((t) => (
                  <span key={t} className="type-badge" style={{ backgroundColor: `var(--type-${t})` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.matchupGrid}>
            <MatchupSection title="Takes 4x Damage" multiplier="4x" types={groups[4]} type="danger" />
            <MatchupSection title="Takes 2x Damage" multiplier="2x" types={groups[2]} type="warning" />
            <MatchupSection title="Normal Damage" multiplier="1x" types={groups[1]} type="normal" />
            <MatchupSection title="Takes 0.5x Damage" multiplier="½x" types={groups[0.5]} type="good" />
            <MatchupSection title="Takes 0.25x Damage" multiplier="¼x" types={groups[0.25]} type="great" />
            <MatchupSection title="Immune to" multiplier="0x" types={groups[0]} type="immune" />
          </div>
        </div>
      )}
    </div>
  );
}

function MatchupSection({ title, multiplier, types, type }: { title: string; multiplier: string; types: string[], type: string }) {
  return (
    <div className={`${styles.matchupCard} ${styles[type]}`}>
      <div className={styles.matchupHeader}>
        <span className={styles.multiplierLabel}>{multiplier}</span>
        <h3 className={styles.matchupTitle}>{title}</h3>
      </div>
      <div className={styles.typeList}>
        {types.length > 0 ? types.map(t => (
          <span key={t} className="type-badge" style={{ backgroundColor: `var(--type-${t})` }}>
            {t}
          </span>
        )) : <span className={styles.emptyMatchup}>None</span>}
      </div>
    </div>
  );
}

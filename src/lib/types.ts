export interface Pokemon {
  id: number;
  /** API slug, e.g. "charizard-mega-x" */
  name: string;
  /** Human-readable name, e.g. "Charizard (Mega X)" */
  displayName: string;
  /** Base species slug, e.g. "charizard" */
  baseName: string;
  /** True if this is the default/base form */
  isDefault: boolean;
  types: string[];
  sprite: string | null;
}

export interface DamageRelations {
  double_damage_to: string[];
  half_damage_to: string[];
  no_damage_to: string[];
  double_damage_from: string[];
  half_damage_from: string[];
  no_damage_from: string[];
}

export type TypeChart = Record<string, DamageRelations>;

export interface CoverageResult {
  /** enemy type being attacked */
  enemyType: string;
  /** list of Pokémon in team that deal ×2 to this type */
  attackers: Pokemon[];
}

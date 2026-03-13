# Informacja o Migracji Środowiska

Projekt "Pokemon Team Picker" (zgodnie z architekturą z `plan_projektu.md`) nie został zainicjalizowany ze względu na problemy z Execution Policy oraz nazewnictwem folderów (`PokemonTeamPicker` z dużych liter konfliktowało z regułami `npm` i `create-next-app`) w pierwotnym środowisku Windows.

**Obecny stan:** 
Czyste repozytorium z przygotowaną dokumentacją architektoniczną i listą zadań (`task.md`).

**Następny krok (po uruchomieniu na Linux):**
Należy rozpocząć od wygenerowania w tym folderze nowej aplikacji **Next.js (App Router)** bez użycia Tailwind CSS oraz przejść płynnie ze zaktualizowanej listy zadań w `task.md`. W trakcie generowania unikać dużej nazwy w poleceniu np. należy użyć nazwy `pokemon-team-picker`.

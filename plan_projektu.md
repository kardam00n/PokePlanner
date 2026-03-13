# Plan Projektu: Pokemon Team Picker & Type Coverage Analyzer

## 1. Cel Aplikacji
Stworzenie intuicyjnej aplikacji webowej pozwalającej użytkownikowi na skompletowanie wymarzonej drużyny Pokemonów (maksymalnie 6 stworków). Aplikacja ma dodatkowo analizować siłę ofensywną drużyny, sprawdzając, które typy przeciwników są podatne na ataki wynikające z typów naszych Pokemonów. Mechanika zakłada, że Pokemon o konkretnym typie używa wyłącznie ataków powiązanych ze swoim typem.

## 2. Główne Funkcjonalności
* **Wyszukiwarka Pokemonów**: Szybkie wyszukiwanie Pokemonów po nazwie obsługiwane na zoptymalizowanej statycznej liście.
* **Zarządzanie Drużyną**: Dodawanie i usuwanie Pokemonów ze stałym limitem 6 sztuk.
* **Wizualizacja Zespołu**: Prezentacja drużyny z użyciem oficjalnych grafik (sprite'ów) oraz wskaźników ich typów.
* **Analiza Ofensywna (Type Coverage)**: Wyliczanie w czasie rzeczywistym, w jakie typy nasza drużyna uderza "Super Efektywnie" (x2), z wizualnym podziałem na to, które Pokemony z naszej drużyny kontrują danego przeciwnika.

## 3. Źródło Danych i Architektura (Next.js + Vercel)
Korzystamy z darmowego **PokeAPI** (`https://pokeapi.co/`).
Ze względu na rzadko zmieniające się informacje w świecie gier Pokemon zdecydowaliśmy się na **Architekturę pre-renderowaną (SSG - Static Site Generation)**:
1. Podczas budowania (Build) na serwerach Vercel, nasza aplikacja odpytuje PokeAPI pobierając wymaganą listę stworków, ścieżki do grafik oraz mapę oporności i słabości typów.
2. Zebrane dane są agregowane i zapisywane do zoptymalizowanych plików JSON, które służą za nasz własny, błyskawicznie działający zbiór informacji ("bazę").
3. Urządzenie klienta (przeglądarka) nie odpytuje bezpośrednio oryginalnego PokeAPI, lecz korzysta z ultra-szybkich, serwowanych z pamięci rozproszonej (CDN) statycznych danych pobranych podczas Buildu.
4. Aktualizacje zawartości (np. wypuszczenie nowej generacji Pokemon w grach) realizujemy manualnie poprzez wymuszenie ponownego przetworzenia (Rebuild projektu) jednym kliknięciem z poziomu panelu Vercel.

## 4. Stos Technologiczny
* **Framework**: **Next.js (App Router)** - wykorzystywany głownie w celu SSG i optymalizacji.
* **Hosting**: **Vercel** - darmowy dla projektów pobocznych, idealna i natywna integracja z repozytorium na Githubie oraz Next.js.
* **Styling**: **Vanilla CSS / CSS Modules**, kładący nacisk na dynamiczne zmienne kolorystyczne dopasowujące się do konkretnych 18 typów Pokemonów, estetykę (Glassmorphism, hover-details) oraz nowoczesną responsywność.

## 5. Fazy Wdrożenia
1. **Inicjalizacja**: Wygenerowanie aplikacji `create-next-app` i setup pierwszych komponentów (np. interfejs wyboru Opcji).
2. **Logika Build-Time (Pobieranie Danych)**: Utworzenie mechanizmu (lokalnego API Next.js lub skryptów wewnątrz buildu), odpowiedzialnego za jednorazowe pobranie paczek z informacjami od PokeAPI.
3. **Core UI**: Ostylowanie głównego interfejsu (wyszukiwarki ze wsparciem auto-uzuepłniania oraz planszy drużyny).
4. **Logika Typów (Coverage Calculator)**: Napisanie skryptu z algorytmem weryfikującym matematykę typów na wybranej szóstce Pokemonów.
5. **Polishing & Vercel**: Dodanie mikro-interakcji, potwierdzenie działania aplikacji poprzez `npm run build` lokalnie i finalne podpięcie repozytorium GitHub pod Vercel w celu udostępnienia aplikacji publicznie.

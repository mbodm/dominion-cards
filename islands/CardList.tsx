import { useEffect, useState } from "preact/hooks";
import Card from "../components/Card.tsx";

interface CardData {
  name: string;
  url: string;
}

const FAVORITES_KEY = "dominion-favorites";

function getFavorites(): Set<string> {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return new Set(stored ? JSON.parse(stored) : []);
  } catch {
    return new Set();
  }
}

function saveFavorites(favorites: Set<string>) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
}

function cardId(url: string): string {
  return "card-" + url.replace(/[^a-zA-Z0-9]/g, "-");
}

interface Props {
  favoritesOnly?: boolean;
}

export default function CardList({ favoritesOnly = false }: Props) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFavorites(getFavorites());
    const controller = new AbortController();
    fetch("/api/cards", { signal: controller.signal })
      .then((res) => res.json())
      .then(setCards)
      .catch((err) => {
        if (err.name !== "AbortError") setError("Fehler beim Laden der Karten.");
      });
    return () => controller.abort();
  }, []);

  function toggleFavorite(url: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      saveFavorites(next);
      return next;
    });
  }

  function handleSearch() {
    const query = search.trim().toLowerCase();
    if (!query) return;
    const match = cards.find((c) => c.name.toLowerCase().includes(query));
    if (!match) return;
    document.getElementById(cardId(match.url))?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (error) return <p class="error">{error}</p>;
  if (cards.length === 0) return <p class="loading">Lade Karten...</p>;

  const displayCards = favoritesOnly
    ? cards.filter((c) => favorites.has(c.url))
    : cards;

  if (favoritesOnly && displayCards.length === 0) {
    return <p class="loading">Noch keine Favoriten gespeichert.</p>;
  }

  return (
    <>
      {!favoritesOnly && (
        <div class="search-bar">
          <input
            type="text"
            class="search-input"
            placeholder="Kartenname suchen..."
            value={search}
            onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <button class="search-btn" onClick={handleSearch}>🔍</button>
        </div>
      )}
      <div class="card-grid">
        {displayCards.map((card) => (
          <Card
            key={card.url}
            id={cardId(card.url)}
            image={card.url}
            name={card.name}
            isFavorite={favorites.has(card.url)}
            onToggle={() => toggleFavorite(card.url)}
          />
        ))}
      </div>
    </>
  );
}

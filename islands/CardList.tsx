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

interface Props {
  favoritesOnly?: boolean;
}

export default function CardList({ favoritesOnly = false }: Props) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

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

  if (error) return <p class="error">{error}</p>;
  if (cards.length === 0) return <p class="loading">Lade Karten...</p>;

  const displayCards = favoritesOnly
    ? cards.filter((c) => favorites.has(c.url))
    : cards;

  if (favoritesOnly && displayCards.length === 0) {
    return <p class="loading">Noch keine Favoriten gespeichert.</p>;
  }

  return (
    <div class="card-grid">
      {displayCards.map((card) => (
        <Card
          key={card.url}
          image={card.url}
          name={card.name}
          isFavorite={favorites.has(card.url)}
          onToggle={() => toggleFavorite(card.url)}
        />
      ))}
    </div>
  );
}

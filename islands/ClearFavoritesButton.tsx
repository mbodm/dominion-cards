import { useEffect, useState } from "preact/hooks";

const FAVORITES_KEY = "dominion-favorites";

function hasFavorites(): boolean {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.length > 0;
  } catch {
    return false;
  }
}

export default function ClearFavoritesButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(hasFavorites());
  }, []);

  if (!visible) return null;

  function handleClick() {
    localStorage.removeItem(FAVORITES_KEY);
    location.reload();
  }

  return (
    <button class="clear-btn" onClick={handleClick} title="Alle Favoriten entfernen">
      ✘
    </button>
  );
}

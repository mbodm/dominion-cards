const FAVORITES_KEY = "dominion-favorites";

export default function ClearFavoritesButton() {
  function handleClick() {
    localStorage.removeItem(FAVORITES_KEY);
    location.reload();
  }

  return (
    <button class="clear-btn" onClick={handleClick} title="Alle Favoriten entfernen">
      ✕
    </button>
  );
}

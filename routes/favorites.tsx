import CardList from "../islands/CardList.tsx";
import ClearFavoritesButton from "../islands/ClearFavoritesButton.tsx";

export default function FavoritesPage() {
  return (
    <main>
      <h1>
        <a href="/" class="back-link">&#9664;</a>
        Favoriten
        <ClearFavoritesButton />
      </h1>
      <CardList favoritesOnly={true} />
    </main>
  );
}

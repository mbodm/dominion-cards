import CardList from "../islands/CardList.tsx";

export default function FavoritesPage() {
  return (
    <main>
      <h1>
        <a href="/" class="back-link">←</a>
        Favoriten
      </h1>
      <CardList favoritesOnly={true} />
    </main>
  );
}

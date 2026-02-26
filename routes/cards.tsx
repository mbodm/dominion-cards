import CardList from "../islands/CardList.tsx";

export default function CardsPage() {
  return (
    <main>
      <h1>
        <a href="/" class="back-link">&lt;</a>
        Alle Karten
      </h1>
      <CardList />
    </main>
  );
}

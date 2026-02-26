export default function Home() {
  return (
    <main class="home">
      <h1>Dominion Karten</h1>
      <div class="home-buttons">
        <a href="/cards" class="home-btn"><span style="font-size: 1.45rem">❖</span> Alle</a>
        <a href="/favorites" class="home-btn home-btn--favorites">★ Favoriten</a>
      </div>
    </main>
  );
}

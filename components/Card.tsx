interface CardProps {
  id?: string;
  image: string;
  name: string;
  isFavorite: boolean;
  onToggle: () => void;
}

export default function Card({ id, image, name, isFavorite, onToggle }: CardProps) {
  return (
    <div class="card" id={id}>
      <div class="card-image-wrapper">
        <img src={image} alt={name} title={name} loading="lazy" />
        <button
          class={`star-btn${isFavorite ? " star-btn--active" : ""}`}
          onClick={onToggle}
          title={isFavorite ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <p class="card-name">{name}</p>
    </div>
  );
}

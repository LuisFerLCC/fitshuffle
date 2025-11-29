export function OutfitCard({ outfit }) {
  return (
    <div key={outfit.id} className="outfit-card outfit-card-1">
      <span className="outfit-label">
        {outfit.data().nombre}
      </span>
    </div>
  )
}

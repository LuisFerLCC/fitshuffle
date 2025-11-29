import { useCollection } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom"
import { query, collection, where, orderBy, documentId } from "firebase/firestore";
import { firestore } from "../firebase";

export function OutfitCard({ outfit }) {
  const navigate = useNavigate();
  const [garmentsSnapshot] = useCollection(
    query(
      collection(firestore, "prendas"),
      where(documentId(), "in", outfit.data().idsPrendas),
      orderBy("fecha", "desc"),
    )
  );

  async function onClick(e) {
    navigate("/generator", {
      state: { ...outfit.data(), prendas: garmentsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))}
    })
  }

  return (
    <button onClick={onClick} className="outfit-card outfit-card-1">
      <div className="outfit-label">
        {outfit.data().nombre}
      </div>
    </button>
  )
}

import { ref as storageRef } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth"
import { useDownloadURL } from "react-firebase-hooks/storage"
import { auth, storage } from "../firebase";

export function GarmentCard({ garment }) {
  const [user] = useAuthState(auth);
  const [imageUrl] = useDownloadURL(storageRef(storage, `${user.uid}/${garment.id}`))

	return (
    <div key={garment.id} className="closet-item">
      <img src={imageUrl} alt="" />
      <div className="garment-name">{garment.data().nombre}</div>
		</div>
	)
}

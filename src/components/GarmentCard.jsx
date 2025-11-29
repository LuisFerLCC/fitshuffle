import { ref as storageRef } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth"
import { useDownloadURL } from "react-firebase-hooks/storage"
import { auth, storage } from "../firebase";

export function GarmentCard({ id, data, dark = false }) {
  const [user] = useAuthState(auth);
  const [imageUrl] = useDownloadURL(storageRef(storage, `${user.uid}/${id}`))

  if (!data) return <></>;

	return (
    <div className={`closet-item ${dark ? "closet-item-dark" : ""}`}>
      <img src={imageUrl} alt="" />
      <div className="garment-name">{data.nombre}</div>
		</div>
	)
}

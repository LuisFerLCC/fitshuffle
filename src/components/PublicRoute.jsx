import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import { auth } from "../firebase";

export function PublicRoute({ children }) {
	const [user, loading] = useAuthState(auth);

	if (loading) return <></>;
	if (user) return <Navigate to="/inicio" replace />;

	return children;
}

import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

import { auth } from "../firebase";

export function PrivateRoute({ children }) {
	const [user, loading] = useAuthState(auth);

	if (loading) return <></>;
	if (!user) return <Navigate to="/login" replace />;

	return children;
}

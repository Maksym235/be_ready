import { getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "./firebase";

export const AuthProvider = () => {
	const auth = getAuth(app);
	const [user, setUser] = useState(auth.currentUser);
	return user != null ? <>{user}</> : <></>;
};

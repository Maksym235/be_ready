import { getAuth } from 'firebase/auth';
import { app } from './firebase';

export const AuthProvider = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  return user != null ? <>{user}</> : <></>;
};

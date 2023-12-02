import React, {createContext, useState, FC, ReactNode} from "react";
import {User} from "../interfaces/User";
import app from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import {ToastContainer, toast} from "react-toastify";

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: () => Promise<void>;
}

// Create the context with an initial empty value
export const UserContext = createContext<UserContextType | null>(null);

// Define the provider component
export const UserProvider: FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        const isNewUser =
          new Date(result.user.metadata?.creationTime || "")?.getTime() ===
          new Date(result.user.metadata?.lastSignInTime || "")?.getTime();
        if (isNewUser) {
          await addDoc(collection(db, "users"), {
            ...user,
          });
          toast("User Account has been created!");
        } else {
          //if user is already registered
          toast("Login Successful!");
        }
        // ...
      })
      .catch((error) => {
        toast("An error occured during signin!");
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <UserContext.Provider value={{user, setUser, signIn: googleSignIn}}>
      {children}
    </UserContext.Provider>
  );
};

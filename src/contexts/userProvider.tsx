import React, {createContext, useState, FC, ReactNode, useEffect} from "react";
import {User} from "../interfaces/User";
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
  setDoc,
} from "firebase/firestore";
import {toast} from "react-toastify";

import * as firebase from "firebase/app";
import "firebase/auth"; // Import other services you might use e.g., firestore, storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0e7wWvFNQKvkKJQz8Xigp7GIouM1n80I",
  authDomain: "finsyt.firebaseapp.com",
  projectId: "finsyt",
  storageBucket: "finsyt.appspot.com",
  messagingSenderId: "810888338279",
  appId: "1:810888338279:web:16da3c81f56a33fd3c6dc2",
  measurementId: "G-97N5KDN185",
};

// Initialize Firebase
if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signIn: () => Promise<boolean>;
  updateUser: (updatedUserInfo: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

// Create the context with an initial empty value
export const UserContext = createContext<UserContextType | null>(null);

// Define the provider component
export const UserProvider: FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const db = getFirestore();

  const googleSignIn = async (): Promise<boolean | undefined> => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      return await signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          if (user) {
            const isNewUser =
              new Date(user.metadata?.creationTime || "")?.getTime() ===
              new Date(user.metadata?.lastSignInTime || "")?.getTime();
            let auth_user = {
              email: user.email,
              name: user?.displayName,
              id: user?.uid,
              metadata: {
                creationTime: user.metadata?.creationTime,
                lastSignInTime: user.metadata?.lastSignInTime,
              },
            };
            console.log(auth_user);
            if (isNewUser) {
              await setDoc(doc(db, "users", user.uid), auth_user);
              toast("User Account has been created!");
              setUser(auth_user);
              setIsLoading(false);
              return true;
            } else {
              //if user is already registered
              setUser(auth_user);
              // toast("Login Successful!");
              setIsLoading(false);
              return true;
            }
          }
        })
        .catch((error) => {
          toast("An error occured during signin!");
          console.log(error);
          setIsLoading(false);
          return false;
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (err) {
      return false;
    }
  };

  const updateUser = async (
    updatedUserInfo: Partial<User>
  ): Promise<boolean> => {
    if (!user) return;

    try {
      // Update user document in Firestore
      const userRef = doc(db, `users/${user.id}`);
      // For older namespaced SDK: const userRef = firebase.firestore().doc(`users/${user.id}`);

      await setDoc(userRef, updatedUserInfo, {merge: true});
      // For older namespaced SDK: await userRef.set(updatedUserInfo, { merge: true });

      // Update user state
      setUser({...user, ...updatedUserInfo});
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
      // Handle error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let auth_user = {
          email: user.email,
          name: user?.displayName,
          id: user?.uid,
          metadata: {
            creationTime: user.metadata?.creationTime,
            lastSignInTime: user.metadata?.lastSignInTime,
          },
        };
        setUser(auth_user);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{user, setUser, signIn: googleSignIn, isLoading, updateUser}}
    >
      {children}
    </UserContext.Provider>
  );
};

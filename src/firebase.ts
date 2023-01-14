import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

export async function logInWithEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function logInWithGoogle() {
  const {
    user: { displayName: name, email, photoURL, uid },
  } = await signInWithPopup(auth, googleProvider)
  const { docs } = await getDocs(
    query(collection(db, "users"), where("uid", "==", uid)),
  )
  if (docs.length === 0) {
    await addDoc(collection(db, "users"), {
      authProvider: "google",
      email,
      name,
      photoURL,
      uid,
    })
  }
}

export async function logOut() {
  await signOut(auth)
}

export async function registerWithEmail(
  name: string,
  email: string,
  password: string,
) {
  const {
    user: { uid },
  } = await createUserWithEmailAndPassword(auth, email, password)
  await addDoc(collection(db, "users"), {
    authProvider: "local",
    email,
    name,
    photoURL: "",
    uid,
  })
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email)
}

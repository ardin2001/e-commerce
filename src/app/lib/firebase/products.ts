import {
  collection,
  query,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import App from "./config";

const db = getFirestore(App);

export async function GetAll(document: string) {
  const q = query(collection(db, document));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export async function GetById(document: string, id: string) {
  const docRef = doc(db, document, id);
  const docSnap = await getDoc(docRef);
  let result = {};
  if (docSnap.exists()) {
    result = { id: docSnap.id, ...docSnap.data() };
  } else {
    result = {};
  }
  return result;
}

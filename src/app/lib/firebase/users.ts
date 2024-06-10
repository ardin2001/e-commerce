import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  or,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import App from "./config";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(App);

export async function GetUserById(id: any) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { status: true, statusCode: 200, data: docSnap.data() };
  }
  return { status: false, statusCode: 401, data: null };
}

export async function GetUserBy(inputUser: any) {
  const q = query(
    collection(db, "users"),
    or(
      where("email", "==", inputUser.email)
      //   where("fullname", "==", inputUser.fullname)
    )
  );
  try {
    const querySnapshot = await getDocs(q);
    const response: any = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    if (response.length == 0) {
      return { status: false, statusCode: 401, data: null };
    }
    return { status: true, statusCode: 200, data: response[0] };
  } catch {
    return { status: false, statusCode: 501, data: null };
  }
}

export async function PostUser(dataInput: any) {
  const { status } = await GetUserBy(dataInput);
  if (!status) {
    try {
      await setDoc(doc(collection(db, "users")), dataInput);
      return { status: true, statusCode: 200 };
    } catch {
      return { status: false, statusCode: 501 };
    }
  }
  return { status: false, statusCode: 401 };
}

export async function GetAllUser() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const response: any = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return { status: true, statusCode: 200, data: response };
  } catch {
    return { status: false, statusCode: 501, data: null };
  }
}

export async function DeleteUser(id: any) {
  const { status } = await GetUserById(id);
  if (!status) {
    return { status: false, statusCode: 401 };
  }

  try {
    await deleteDoc(doc(db, "users", id));
    return { status: true, statusCode: 200 };
  } catch {
    return { status: false, statusCode: 501 };
  }
}

export async function UpdateUser({
  id,
  dataUpdate,
}: {
  id: string;
  dataUpdate: any;
}) {
  const { status } = await GetUserById(id);
  if (!status) {
    return { status: false, statusCode: 401 };
  }

  try {
    await updateDoc(doc(db, "users", id), dataUpdate);
    return { status: true, statusCode: 200 };
  } catch {
    return { status: false, statusCode: 501 };
  }
}

export async function Login(inputUser: any) {
  try {
    const { status, data } = await GetUserBy(inputUser);
    if (!status) {
      return { status, statusCode: 401, data };
    }
    if (data.password == inputUser.password) {
      return { status, statusCode: 200, data: data };
    }
    return { status: false, statusCode: 401, data: null };
  } catch {
    return { status: false, statusCode: 501, data: null };
  }
}

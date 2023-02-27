import { ref, onValue, set } from "firebase/database";
import { database } from "@/utils/firebaseConfig";

export const getData = (table, cb) => {
  const db = database;
  const starCountRef = ref(db, table);
  onValue(starCountRef, cb);
};

export const postData = (table, cb) => {
  const db = database;
  const Ref = ref(db, table);
  return set(Ref, cb);
};

import { child, get, getDatabase, ref, set } from "firebase/database";

// export const setBetaKeys = async () => {
//   const dbRef = getDatabase();
//   await set(ref(dbRef, "betaKeys"), { "betaKeys": betaKeys });
// };

export const getBetaKeys = async () => {
  try {
    const dbRef = ref(getDatabase());
    const getDb = await get(child(dbRef, "betaKeys/betaKeys"));
    return getDb.val();
  } catch (e) {
    return undefined;
  }
};

export const updateBetaKeys = async (usedKey, betaKeysArray) => {
  try {
    const data = betaKeysArray;
    const dbRef = getDatabase();
    const keyIndex = data.indexOf(usedKey);
    data.splice(keyIndex, 1);
    await set(ref(dbRef, "betaKeys"), { "betaKeys": data });
  } catch (e) {
    console.log("updateError", e);
  }


  // await set(ref(dbRef, "betaKeys", { "betaKeys": betaKeys }));
};

import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

/**
 * Update the user's gender.
 * @param userId The user's ID.
 * @param gender The new gender value.
 */
export const updateUserGender = async (
  userId: string,
  gender: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {gender});
};

/**
 * Update the user's relationship status.
 * @param userId The user's ID.
 * @param relationship The new relationship status.
 */
export const updateUserRelationship = async (
  userId: string,
  relationship: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {relationship});
};

// Similar functions for dependants, income, debt, spendables, and metadata
// ...

/**
 * Update the user's dependants.
 * @param userId The user's ID.
 * @param dependants The new dependants value.
 */
export const updateUserDependants = async (
  userId: string,
  dependants: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {dependants});
};

/**
 * Update the user's income.
 * @param userId The user's ID.
 * @param income The new income value.
 */
export const updateUserIncome = async (
  userId: string,
  income: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {income});
};

/**
 * Update the user's debt.
 * @param userId The user's ID.
 * @param debt The new debt value.
 */
export const updateUserDebt = async (
  userId: string,
  debt: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {debt});
};

/**
 * Update the user's spendables.
 * @param userId The user's ID.
 * @param spendables The new spendables value.
 */
export const updateUserSpendables = async (
  userId: string,
  spendables: string | null
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {spendables});
};

/**
 * Update the user's metadata.
 * @param userId The user's ID.
 * @param metadata The new metadata object.
 */
export const updateUserMetadata = async (
  userId: string,
  metadata: any
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {metadata});
};

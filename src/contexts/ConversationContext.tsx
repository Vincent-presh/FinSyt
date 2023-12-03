import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";

import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  arrayUnion,
  DocumentReference,
  getFirestore,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import {Conversation, Message} from "../interfaces/User";

interface ConversationContextType {
  createConversation: (participants: string[]) => Promise<void>;
  sendMessage: (conversationId: string, message: Message) => Promise<void>;
  listenToConversation: (
    conversationId: string,
    onChange: (conversation: Conversation) => void
  ) => () => void;
  getAllConversationsForUser: (userId: string) => Promise<Conversation[]>;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider: FC<{children: ReactNode}> = ({children}) => {
  const db = getFirestore();

  function createIntroContext(user: User): string {
    let introContext = `User ID: ${user.id}. `;

    if (user.name) {
      introContext += `Name: ${user.name}. `;
    }

    if (user.email) {
      introContext += `Email: ${user.email}. `;
    }

    // Optional fields
    if (user.gender) {
      introContext += `Gender: ${user.gender}. `;
    }

    if (user.relationship) {
      introContext += `Relationship status: ${user.relationship}. `;
    }

    if (user.dependants) {
      introContext += `Number of dependants: ${user.dependants}. `;
    }

    if (user.income) {
      introContext += `Income: ${user.income}. `;
    }

    if (user.debt) {
      introContext += `Debt: ${user.debt}. `;
    }

    if (user.spendables) {
      introContext += `Spendable amount: ${user.spendables}. `;
    }

    // You can include more fields based on what's relevant for the OpenAI conversation

    return introContext;
  }

  const createConversation = async (participants: string[]) => {
    const newConversation: Conversation = {participants, messages: []};
    await setDoc(doc(collection(db, "conversations")), newConversation);
  };

  const sendMessage = async (conversationId: string, message: Message) => {
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      messages: arrayUnion(message),
    });
  };

  const listenToConversation = (
    conversationId: string,
    onChange: (conversation: Conversation) => void
  ) => {
    const conversationRef: any = doc(db, "conversations", conversationId);
    return onSnapshot(conversationRef, (doc) => {
      const conversation = {id: doc.id, ...doc.data()} as Conversation;
      onChange(conversation);
    });
  };

  const getAllConversationsForUser = async (
    userId: string
  ): Promise<Conversation[]> => {
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", userId)
    );
    const querySnapshot = await getDocs(q);
    const conversations: Conversation[] = [];

    querySnapshot.forEach((doc) => {
      conversations.push({id: doc.id, ...doc.data()} as Conversation);
    });

    return conversations;
  };

  return (
    <ConversationContext.Provider
      value={{
        createConversation,
        sendMessage,
        listenToConversation,
        getAllConversationsForUser,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationContext);

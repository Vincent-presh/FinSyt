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
    const conversationRef: DocumentReference<Conversation> = doc(
      db,
      "conversations",
      conversationId
    );
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

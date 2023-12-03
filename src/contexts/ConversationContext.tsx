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
import {Conversation, Message, User} from "../interfaces/User";
import {UserContext} from "./userProvider";
import axios from "axios";

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }>;
}

interface ConversationContextType {
  createConversation: (
    participants: string[],
    userMessage: string
  ) => Promise<void>;
  sendMessage: (conversationId: string, message: Message) => Promise<void>;
  listenToConversation: (
    conversationId: string,
    onChange: (conversation: Conversation) => void
  ) => () => void;
  getAllConversationsForUser: (userId: string) => Promise<Conversation[]>;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export const ConversationProvider: FC<{children: ReactNode}> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user}: any = useContext(UserContext);
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

  async function callOpenAI(context: Message[]): Promise<OpenAIResponse> {
    const API_URL = "https://api.openai.com/v1/chat/completions"; // Replace with the appropriate API endpoint
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure the API key is set in your environment variables

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: context,
          max_tokens: 150, // Adjust based on your requirements
          // Add other parameters as needed
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }

  const createConversation = async (
    participants: string[],
    userMessage: string
  ) => {
    setIsLoading(true);
    const userIntro = createIntroContext(user);
    let messages = [
      {
        role: "system",
        content: "You are a financial assistant for this user: " + userIntro,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];
    const newConversation: Conversation = {
      participants,
      messages: messages,
    };
    await setDoc(doc(collection(db, "conversations")), newConversation);
    await callOpenAI(messages);
    setIsLoading(false);
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
    return onSnapshot(conversationRef, (doc: any) => {
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

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  gender?: null;
  photoUrl?: string | null;
  relationship?: null;
  dependants?: null;
  income?: null;
  debt?: null;
  spendables?: null;
  metadata?: any;
  // Add other relevant user properties
}

export interface Message {
  role: string;
  senderId?: string;
  content?: string;
}

export interface Conversation {
  id?: string;
  participants: string[];
  messages: Message[];
  timestamp?: any;
}

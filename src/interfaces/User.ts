export interface User {
  id: string;
  name: string | null;
  email: string | null;
  gender?: null;
  relationship?: null;
  dependants?: null;
  income?: null;
  debt?: null;
  spendables?: null;
  metadata?: any;
  // Add other relevant user properties
}

export interface Message {
  senderId: string;
  text: string;
  timestamp: any;
}

export interface Conversation {
  id?: string;
  participants: string[];
  messages: Message[];
}

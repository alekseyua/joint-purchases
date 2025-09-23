export interface WebSocketState {
  messages: any[];
  lastMessage: any | null;
}

export type WebSocketAction =
  | { type: "ADD_MESSAGE"; payload: any }
  | { type: "CLEAR_MESSAGES" };

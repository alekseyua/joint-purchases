import type { WebSocketAction, WebSocketState } from "~/types/websocket.reducer";


export const initialWebSocketState: WebSocketState = {
  messages: [],
  lastMessage: null,
};

export function webSocketReducer(
  state: WebSocketState,
  action: WebSocketAction
): WebSocketState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        lastMessage: action.payload,
      };

    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [],
        lastMessage: null,
      };

    default:
      return state;
  }
}

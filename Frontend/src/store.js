import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/store/authSlice';
import chatReducer from './features/chat/store/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

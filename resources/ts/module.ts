import { createSlice, configureStore, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit';

export interface IMessage {
	user: string;
	postTime: string;
	content: string;
}

interface IAppState {
	inputFieldHeight: number;
}

const initialState: IAppState = {
	inputFieldHeight: 64,
};

const module = createSlice({
	name: 'task_chat',
	initialState,
	reducers: {
		updateChatHeight: (state, action: PayloadAction<number>) => {
			state.inputFieldHeight = action.payload;
		},
	},
});

const setupStore = () => {
	const middleware = [...getDefaultMiddleware()];
	return configureStore({
		middleware,
		reducer: module.reducer,
	});
};

export default module;
export const store = setupStore();
export type AppState = ReturnType<typeof store.getState>;

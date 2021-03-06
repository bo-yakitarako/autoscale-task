import { createSlice, configureStore, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit';

export interface IMessage {
	userName: string;
	postTime: string;
	content: string;
}

interface IAppState {
	nameRequirement: boolean;
	userName: string;
	inputFieldHeight: number;
	lookingAtLatest: boolean;
	newPost: boolean;
	userInput: string;
	messages: IMessage[];
	members: string[];
}

const initialState: IAppState = {
	nameRequirement: true,
	userName: '',
	inputFieldHeight: 64,
	lookingAtLatest: true,
	newPost: false,
	userInput: '',
	messages: [],
	members: [],
};

const csrfToken = (document.getElementsByName('csrf-token').item(0) as HTMLMetaElement).content;

export const post = (path: string, body: string, method = '', callback?: Function) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && callback) {
			callback(xhr.status, xhr.responseText);
		}
	};
	xhr.open('POST', path, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader('X-CSRF-Token', csrfToken);
	xhr.send(body + (method !== '' ? '&_method=' + method : ''));
};

const module = createSlice({
	name: 'task_chat',
	initialState,
	reducers: {
		openChat: (state) => {
			state.nameRequirement = false;
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
		updateChatHeight: (state, action: PayloadAction<number>) => {
			state.inputFieldHeight = action.payload;
		},
		lookAtLatest: (state, action: PayloadAction<boolean>) => {
			state.lookingAtLatest = action.payload;
			if (action.payload && state.newPost) {
				state.newPost = false;
			}
		},
		toggleNewPost: (state, action: PayloadAction<boolean>) => {
			state.newPost = action.payload;
		},
		inputMessage: (state, action: PayloadAction<string>) => {
			state.userInput = action.payload;
		},
		updateMessages: (state, action: PayloadAction<IMessage[]>) => {
			state.messages = action.payload;
			if (!state.lookingAtLatest) {
				state.newPost = true;
			}
		},
		updateMembers: (state, action: PayloadAction<string[]>) => {
			if (!action.payload.includes(state.userName) && state.userName !== '') {
				location.reload();
				return;
			}
			state.members = action.payload;
		},
		submitMessage: (state) => {
			if (state.userInput !== '') {
				post('/message/post', `userName=${state.userName}&content=${state.userInput}`);
				state.inputFieldHeight = 64;
				const mainChatDOM = document.querySelector('#main_chat') as HTMLDivElement;
				mainChatDOM.scrollTop = mainChatDOM.scrollHeight;
				state.newPost = false;
				state.userInput = '';
			}
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

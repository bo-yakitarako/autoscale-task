import { createSlice, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const module = createSlice({
    name: 'task_chat',
    initialState: {},
    reducers: {
        //    
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

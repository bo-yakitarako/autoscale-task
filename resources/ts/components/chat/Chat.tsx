import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import module, { AppState } from '../../module';
import Message from './Message';
import InputField from './InputField';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
        minHeight: '100vh',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            width: 640,
        },
    },
    mainChat: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        overflowX: 'hidden',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    }
}));

const Chat = () => {
    const dispatch = useDispatch();
    const { userName, inputFieldHeight, lookingAtLatest: isLookingAtLatest, messages } = useSelector((state: AppState) => state);
    const classes = useStyles();
    useEffect(() => {
        if (isLookingAtLatest) {
            const chatDOM = document.querySelector('#main_chat') as HTMLDivElement;
            chatDOM.scrollTop = chatDOM.scrollHeight;
        }
    });
    return (
        <div className={classes.root}>
            <div
                id="main_chat"
                className={classes.mainChat}
                style={{ maxHeight: `calc(100vh - ${inputFieldHeight + 8}px)` }}
                onScroll={(event) => {
                    const chatDOM = event.currentTarget;
                    const lookingAtLatest = chatDOM.scrollHeight - chatDOM.scrollTop - 120 < chatDOM.clientHeight;
                    dispatch(module.actions.lookAtLatest(lookingAtLatest));
                }}
            >
                {messages.map((message, index) => (
                    <Message key={index} message={message} me={userName === message.user} />
                ))}
            </div>
            <InputField />
        </div>
    );
};

export default Chat;

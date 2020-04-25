import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { AppState } from '../../module';
import Message from './Message';
import InputField from './InputField';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
        minHeight: '100vh',
        width: '100%',
        margin: '0 auto',
        overflowX: 'hidden',
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            width: 640,
        },
    },
    mainChat: {
        marginTop: theme.spacing(1),
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'scroll',
    }
}));

const Chat = () => {
    const { inputFieldHeight } = useSelector((state: AppState) => state);
    const classes = useStyles();
    useEffect(() => {
        const chatDOM = document.querySelector('#main_chat') as HTMLDivElement;
        chatDOM.scrollTop = chatDOM.scrollHeight;
    });
    return (
        <div className={classes.root}>
            <div id="main_chat" className={classes.mainChat} style={{ maxHeight: `calc(100vh - ${inputFieldHeight + 8}px)` }}>
                <Message message={{ user: '私', postTime: '2038/07/12 07:24', content: '未来の私です' }} me />
                <Message message={{ user: '誰か', postTime: '2038/07/12 07:30', content: '誰かになりたくてかろうじてなることができました。\nよろしくお願いします。' }} me={false} />
            </div>
            <InputField />
        </div>
    );
};

export default Chat;

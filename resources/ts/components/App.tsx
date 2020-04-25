import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Chat from './chat/Chat';
import MemberList from './MemberList';

const useStyles = makeStyles((theme: Theme) => createStyles({
    app: {
        display: 'block',
        width: '96%',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'row',
            width: 960 - theme.spacing(2),
        }
    }
}));

const App = () => {
    const { app } = useStyles();
    return (
        <div className={app}>
            <Chat />
            <MemberList />
        </div>
    );
};

export default App;

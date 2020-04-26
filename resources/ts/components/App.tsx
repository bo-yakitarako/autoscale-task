import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme, Fab, Backdrop } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import clsx from 'clsx';
import module, { IMessage } from '../module';
import Chat from './chat/Chat';
import MemberList from './MemberList';
import JoinSheet from './JoinSheet';

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
	},
	memberList: {
		position: 'fixed',
		top: 0,
		right: -250,
		zIndex: 9,
		transitionDuration: '0.2s',
		'&.expand': {
			right: 0,
		},
		[theme.breakpoints.up('md')]: {
			position: 'relative',
			top: 'auto',
			right: 'auto',
			transition: 'none',
		}
	},
	memberListExpansion: {
		display: 'block',
		position: 'fixed',
		right: theme.spacing(2),
		top: theme.spacing(2),
		zIndex: 2,
		[theme.breakpoints.up('md')]: {
			display: 'none',
		}
	},
	backdrop: {
		zIndex: 8,
		transitionDuration: '0.2s',
	},
}));

const App = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [expanded, expandMemberList] = useState(false);
	window.Echo.channel('message-received-channel').listen('MessageReceived', (data: { message: IMessage[] }) => {
		dispatch(module.actions.updateMessages(data.message));
	});
	window.Echo.channel('member-update-channel').listen('MemberUpdated', (data: { members: string[] }) => {
		dispatch(module.actions.updateMembers(data.members));
	});
	window.onload = () => {
		const initRequest = new XMLHttpRequest();
		initRequest.onreadystatechange = () => {
			if (initRequest.readyState === 4 && initRequest.status === 200) {
				const { messages, members } = JSON.parse(initRequest.responseText) as { messages: IMessage[], members: string[] };
				dispatch(module.actions.updateMessages(messages));
				dispatch(module.actions.updateMembers(members));
			}
		};
		initRequest.open('GET', '/init');
		initRequest.send();
	};
	return (
		<div className={classes.app}>
			<Chat />
			<Fab className={classes.memberListExpansion} color="secondary" onClick={() => expandMemberList(true)}>
				<Person />
			</Fab>
			<Backdrop className={classes.backdrop} open={expanded} onClick={() => expandMemberList(false)} />
			<MemberList className={clsx(classes.memberList, expanded ? 'expand' : '')} />
			<JoinSheet />
		</div>
	);
};

export default App;

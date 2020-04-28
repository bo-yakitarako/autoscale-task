import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme, TextField, IconButton, Badge } from '@material-ui/core';
import { PostAdd, ArrowDownward } from '@material-ui/icons';
import module, { AppState } from '../../module';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		position: 'fixed',
		display: 'flex',
		flexDirection: 'row',
		width: '96%',
		left: '50%',
		bottom: 0,
		transform: 'translateX(-50%)',
		backgroundColor: 'white',
		marginTop: theme.spacing(2),
		zIndex: 7,
		[theme.breakpoints.up('md')]: {
			left: 'calc(50% - 152px)',
			width: 640,
		}
	},
	inputField: {
		flexGrow: 1,
		marginBottom: theme.spacing(1),
	},
	button: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	buttonIcon: {
		width: theme.spacing(5),
		height: theme.spacing(4),
	},
}));

const InputField = () => {
	const dispatch = useDispatch();
	const { newPost, userInput } = useSelector((state: AppState) => state);
	const classes = useStyles();
	const updateHeight = () => {
		const messageInputDOM = document.querySelector('#message_input') as HTMLDivElement;
		dispatch(module.actions.updateChatHeight(messageInputDOM.offsetHeight));
	};
	return (
		<div id="message_input" className={classes.root}>
			<IconButton className={classes.button} onClick={() => {
				const mainChatDOM = document.querySelector('#main_chat') as HTMLDivElement;
				mainChatDOM.scrollTop = mainChatDOM.scrollHeight;
				dispatch(module.actions.toggleNewPost(false));
			}}>
				<Badge color="secondary" invisible={!newPost} variant="dot">
					<ArrowDownward className={classes.buttonIcon} />
				</Badge>
			</IconButton>
			<TextField
				className={classes.inputField}
				value={userInput}
				multiline
				label="メッセージを入力"
				variant="outlined"
				rowsMax={10}
				onInput={updateHeight}
				onChange={(event) => {
					dispatch(module.actions.inputMessage(event.currentTarget.value));
				}}
				onKeyDown={(event) => {
					if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
						dispatch(module.actions.submitMessage());
					}
				}}
				onKeyUp={updateHeight}
			/>
			<IconButton className={classes.button} onClick={() => {
				dispatch(module.actions.submitMessage());
			}}>
				<PostAdd className={classes.buttonIcon} />
			</IconButton>
		</div>
	)
};

export default InputField;

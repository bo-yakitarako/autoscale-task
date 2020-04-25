import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme, TextField, IconButton } from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';
import module from '../../module';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		backgroundColor: 'white',
		marginTop: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			width: 640,
		}
	},
	inputField: {
		flexGrow: 1,
		marginBottom: theme.spacing(1),
	},
	postButton: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	postButtonIcon: {
		width: theme.spacing(5),
		height: theme.spacing(4),
	},
}));

const InputField = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const updateHeight = () => {
		const messageInputDOM = document.querySelector('#message_input') as HTMLDivElement;
		dispatch(module.actions.updateChatHeight(messageInputDOM.offsetHeight));
		const mainChatDOM = document.querySelector('#main_chat') as HTMLDivElement;
		mainChatDOM.scrollTop = mainChatDOM.scrollHeight;
	};
	return (
		<div id="message_input" className={classes.root}>
			<TextField
				id="input_field"
				className={classes.inputField}
				label="メッセージを入力"
				multiline
				variant="outlined"
				rowsMax={10}
				onInput={updateHeight}
				onKeyUp={(event) => {
					if (event.keyCode === 13 || event.keyCode === 8) {
						updateHeight();
					}
				}}
			/>
			<IconButton className={classes.postButton}>
				<PostAdd className={classes.postButtonIcon} />
			</IconButton>
		</div>
	)
};

export default InputField;

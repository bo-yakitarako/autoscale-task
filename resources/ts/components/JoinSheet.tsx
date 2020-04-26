import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme, TextField, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import module, { post, AppState } from '../module';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		position: 'fixed',
		width: '100%',
		height: '100vh',
		left: 0,
		top: 0,
		zIndex: 20,
		backgroundColor: 'white',
		'&.open': {
			transitionDuration: '0.5s',
			left: '100vw',
		},
	},
	nameSubmitForm: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center',
	},
	inputBox: {
		position: 'relative',
		width: '90vw',
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			width: 640,
		}
	},
	submitButton: {
		position: 'relative',
		marginTop: theme.spacing(1),
	},
}));

const JoinSheet = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { userName, nameRequirement } = useSelector((state: AppState) => state);
	const [name, inputName] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const submitCallback = (status: number, response: string) => {
		if (status === 200) {
			dispatch(module.actions.setUserName(name));
			dispatch(module.actions.openChat());
			setTimeout(() => {
				location.reload();
			}, 10800000);
		} else {
			setErrorMessage(response === 'empty' ? '名前が空欄です。' :
				response === 'exist' ? '名前が被っています。' :
					'予期せぬエラーです。');
		}
	};
	const submit = () => {
		if (0 < name.length && name.length <= 256) {
			post('/member/add', 'userName=' + name, false, submitCallback);
		} else if (0 < name.length) {
			setErrorMessage('名前が長すぎます。');
			inputName('');
		}
	};
	window.onunload = window.onbeforeunload = () => {
		if (userName.length > 0) {
			post('/member/delete', 'userName=' + userName, true);
		}
	};
	return (
		<div className={clsx(classes.root, !nameRequirement ? 'open' : '')}>
			<div className={classes.nameSubmitForm}>
				<TextField
					className={classes.inputBox}
					autoFocus
					variant="outlined"
					label="名前を入力"
					margin="dense"
					value={name}
					onChange={(event) => {
						inputName(event.currentTarget.value);
					}}
				/>
				<br/>
				<Button　className={classes.submitButton} color="primary" variant="contained" onClick={submit}>
					入室
				</Button>
			</div>
			<Snackbar open={errorMessage !== ''} autoHideDuration={3000} onClose={() => setErrorMessage('')}>
				<Alert onClose={() => setErrorMessage('')} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
		</div>
	)
};

export default JoinSheet;

import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme, Avatar, Typography } from '@material-ui/core';
import { IMessage } from '../../module';
import clsx from 'clsx';

interface IMessageProps {
	message: IMessage;
	me: boolean;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: theme.spacing(1),
	},
	meFlex: {
		display: 'flex',
		flexDirection: 'row-reverse',
	},
	icon: {
		color: 'white',
		backgroundColor: theme.palette.primary.main,
		width: theme.spacing(5),
		height: theme.spacing(5),
		zIndex: 1,
	},
	invisible: {
		display: 'none',
	},
	info: {
		maxWidth: '75vw',
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			maxWidth: 400,
		}
	},
	userBox: {
		width: '100%',
		marginLeft: theme.spacing(1),
		position: 'relative',
		height: theme.spacing(5),
		zIndex: -1,
	},
	meAlign: {
		textAlign: 'right',
	},
	userInfo: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		flexGrow: 1,
		width: '95%',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontWeight: theme.typography.fontWeightBold,
	},
	contentBox: {
		position: 'relative',
		display: 'inline-block',
		maxWidth: '100%',
		backgroundColor: theme.palette.success.main,
		borderRadius: theme.spacing(2),
		'&::before': {
			content: '""',
			position: 'absolute',
			display: 'block',
			width: 0,
			height: 0,
			left: -theme.spacing(2) + 1,
			top: 0,
			borderRadius: '50%',
			transform: 'rotate(-45deg)',
			borderLeft: `${theme.spacing(2)}px solid ${theme.palette.success.main}`,
			borderTop: `${theme.spacing(2)}px solid ${theme.palette.success.main}`,
			borderRight: `${theme.spacing(2)}px solid transparent`,
			borderBottom: `${theme.spacing(2)}px solid transparent`,
			zIndex: -1,
		},
		'&::after': {
			content: '""',
			position: 'absolute',
			display: 'block',
			width: 0,
			height: 0,
			left: -theme.spacing(2) + 1,
			top: -theme.spacing(2),
			borderRadius: '50%',
			transform: 'rotate(-45deg)',
			borderLeft: `${theme.spacing(2)}px solid white`,
			borderTop: `${theme.spacing(2)}px solid white`,
			borderRight: `${theme.spacing(2)}px solid transparent`,
			borderBottom: `${theme.spacing(2)}px solid transparent`,
			zIndex: -1,
		},
	},
	content: {
		display: 'block',
		padding: theme.spacing(1.5),
		color: 'white',
	},
	meContent: {
		transform: 'scaleX(-1)',
	},
	postTime: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const Message: React.SFC<IMessageProps> = (props: IMessageProps) => {
	const { user, postTime, content } = props.message;
	const classes = useStyles();
	return (
		<div className={clsx(classes.root, props.me ? classes.meFlex : '')}>
			<Avatar className={clsx(classes.icon, props.me ? classes.invisible : '')}>{user[0]}</Avatar>
			<div className={classes.info}>
				<div className={clsx(classes.userBox, props.me ? classes.invisible : '')}>
					<Typography className={classes.userInfo}>{user}</Typography>
				</div>
				<div className={props.me ? classes.meFlex : ''}>
					<div className={clsx(classes.contentBox, props.me ? classes.meContent : '')}>
						<Typography className={clsx(classes.content, props.me ? classes.meContent : '')}>
							{content.split('<br>').map((text, index) => <Fragment key={text + index}>{text}<br /></Fragment>)}
						</Typography>
					</div>
				</div>
				<Typography className={clsx(classes.postTime, props.me ? classes.meAlign : '')}>{postTime}</Typography>
			</div>
		</div>
	);
};

export default Message;

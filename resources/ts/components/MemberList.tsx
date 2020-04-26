import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme, Avatar, Typography, Divider } from '@material-ui/core';
import clsx from 'clsx';
import { AppState } from '../module';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		width: 250,
		minHeight: '100vh',
		maxHeight: '100vh',
		overflowX: 'hidden',
		overflowY: 'scroll',
		backgroundColor: 'white',
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
		[theme.breakpoints.up('md')]: {
			width: 320 - theme.spacing(2),
			borderLeftStyle: 'solid',
			borderLeftWidth: 2,
			borderLeftColor: theme.palette.grey[300],
		},
	},
	memberBox: {
		width: 320 - theme.spacing(3),
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		display: 'flex',
		flexDirection: 'row',
	},
	memberIcon: {
		color: 'white',
		backgroundColor: theme.palette.primary.main,
		width: theme.spacing(5),
		height: theme.spacing(5),
		zIndex: 1,
	},
	meIcon: {
		backgroundColor: theme.palette.secondary.main,
	},
	userNameBox: {
		width: '100%',
		marginLeft: theme.spacing(1),
		position: 'relative',
		height: theme.spacing(5),
		zIndex: -1,
	},
	userName: {
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
	divider: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(1),
	}
}));


const MemberList: React.SFC<{ className?: string }> = (props: { className?: string }) => {
	const classes = useStyles();
	const { userName, members: users } = useSelector((state: AppState) => state);
	const Member: React.SFC<{ name: string, me?: boolean }> = (props: { name: string, me?: boolean }) => {
		return (
			<div className={classes.memberBox}>
				<Avatar className={clsx(classes.memberIcon, props.me ? classes.meIcon : '')}>{props.name[0]}</Avatar>
				<div className={classes.userNameBox}>
					<Typography className={classes.userName}>{props.name}</Typography>
				</div>
			</div>
		);
	};
	return (
		<div className={clsx(classes.root, props.className ? props.className : '')}>
			<Member name={userName} me />
			<Divider className={classes.divider} />
			{users.filter(user => user !== userName).map((user, index) => (
				<Member key={user + index} name={user} />
			))}
		</div>
	);
};

export default MemberList;

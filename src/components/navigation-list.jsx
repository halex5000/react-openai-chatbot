import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import HomeIcon from '@mui/icons-material/Home';
import AccountBox from '@mui/icons-material/AccountBox';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ClipboardList from '@mui/icons-material/List';
import {useFlags} from 'launchdarkly-react-client-sdk';
import Bug from '@mui/icons-material/BugReport';
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppStore} from '../store/app';

function AccountIcon({user, toggleLogin, toggleNavigationDrawer}) {
	const logout = useAppStore((state) => state.logout);
	if (user) {
		return (
			<ListItem>
				<ListItemButton
					onClick={() => {
						logout();
					}}
				>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText>Logout of {user.username}</ListItemText>
				</ListItemButton>
			</ListItem>
		);
	}

	return (
		<ListItem>
			<ListItemButton
				onClick={() => {
					toggleNavigationDrawer();
					toggleLogin();
				}}
			>
				<ListItemIcon>
					<AccountBox />
				</ListItemIcon>
				<ListItemText>Login</ListItemText>
			</ListItemButton>
		</ListItem>
	);
}

AccountIcon.propTypes = {
	user: PropTypes.object,
	toggleLogin: PropTypes.func,
	toggleNavigationDrawer: PropTypes.func,
};

function NavigationList({
	isOpen,
	onClickAway,
	toggleDebugDrawer,
	toggleLogin,
	toggleNavigationDrawer,
}) {
	const user = useAppStore((state) => state.user);
	const {login, toDoList, debugPanel} = useFlags();
	return (
		<Drawer open={isOpen} variant="temporary" sx={{flexShrink: 0}}>
			<ClickAwayListener
				onClickAway={() => {
					onClickAway();
				}}
			>
				<List>
					{login && (
						<AccountIcon
							toggleNavigationDrawer={toggleNavigationDrawer}
							toggleLogin={toggleLogin}
							user={user}
						/>
					)}
					<Divider />
					<ListItem>
						<ListItemButton component={Link} to="/">
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					{toDoList && (
						<ListItem>
							<ListItemButton component={Link} to="/todo-list">
								<ListItemIcon>
									<ClipboardList />
								</ListItemIcon>
								<ListItemText primary="ToDo List" />
							</ListItemButton>
						</ListItem>
					)}
					{debugPanel && (
						<ListItem>
							<ListItemButton
								onClick={() => {
									toggleNavigationDrawer();
									toggleDebugDrawer();
								}}
							>
								<ListItemIcon>
									<Bug />
								</ListItemIcon>
								<ListItemText primary="Dev Tools" />
							</ListItemButton>
						</ListItem>
					)}
				</List>
			</ClickAwayListener>
		</Drawer>
	);
}

NavigationList.propTypes = {
	isOpen: PropTypes.bool,
	onClickAway: PropTypes.func,
	toggleDebugDrawer: PropTypes.func,
	toggleLogin: PropTypes.func,
	toggleNavigationDrawer: PropTypes.func,
};

export default NavigationList;

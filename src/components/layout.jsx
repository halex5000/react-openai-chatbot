import {Container} from '@mui/material';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useFlags} from 'launchdarkly-react-client-sdk';
import AppBar from '../components/app-bar';
import DebugPanel from '../components/debug-panel';
import NavigationList from '../components/navigation-list';
import LoginDialog from './login-dialog';
import UserAgent from './user-agent';

function Layout({children}) {
	const [isDebugOpen, setIsDebugOpen] = useState(false);
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isNavigationOpen, setIsNavigationOpen] = useState(false);

	const {login, debugPanel} = useFlags();

	const toggleDebugDrawer = () => {
		console.log('toggling debug drawer');
		setIsDebugOpen(!isDebugOpen);
	};

	const toggleNavigationDrawer = () => {
		console.log('toggler no toggling');
		setIsNavigationOpen(!isNavigationOpen);
	};

	const handleLoginClose = () => {
		setIsLoginOpen(false);
	};

	return (
		<Container sx={{textAlign: 'center', mx: 'auto'}}>
			<UserAgent />
			{login && (
				<LoginDialog isOpen={isLoginOpen} handleClose={handleLoginClose} />
			)}
			<AppBar
				toggleDebugDrawer={toggleDebugDrawer}
				toggleNavigationDrawer={toggleNavigationDrawer}
			/>
			<NavigationList
				isOpen={isNavigationOpen}
				toggleDebugDrawer={toggleDebugDrawer}
				toggleNavigationDrawer={toggleNavigationDrawer}
				toggleLogin={() => {
					setIsLoginOpen(true);
				}}
				onClickAway={() => {
					setIsNavigationOpen(false);
				}}
			/>
			{children}
			{debugPanel && (
				<DebugPanel
					isOpen={isDebugOpen}
					toggleDebugDrawer={toggleDebugDrawer}
				/>
			)}
		</Container>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;

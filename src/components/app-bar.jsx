import * as React from 'react';
import PropTypes from 'prop-types';
import MaterialAppBar from '@mui/material/AppBar';
import {Box, IconButton, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeSwitcher from './theme-switcher';

function AppBar({toggleNavigationDrawer}) {
	return (
		<Box sx={{flexGrow: 1}}>
			<MaterialAppBar position="fixed">
				<Toolbar>
					{/* <IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{mr: 2, zIndex: (theme) => theme.zIndex.drawer + 1}}
						onClick={() => {
							toggleNavigationDrawer();
						}}
					>
						<MenuIcon />
					</IconButton> */}
					<Box sx={{flexGrow: 1}} />
					<ThemeSwitcher />
				</Toolbar>
			</MaterialAppBar>
		</Box>
	);
}

AppBar.propTypes = {
	toggleNavigationDrawer: PropTypes.func,
};

export default AppBar;

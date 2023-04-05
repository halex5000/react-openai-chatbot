import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAppStore} from '../store/app';

function ThemeSwitcher() {
	const theme = useAppStore((state) => state.theme);
	const toggleTheme = useAppStore((state) => state.toggleTheme);
	return (
		<Box>
			<IconButton sx={{ml: 1}} color="inherit" onClick={toggleTheme}>
				{theme.palette.mode === 'dark' ? (
					<Brightness7Icon />
				) : (
					<Brightness4Icon />
				)}
			</IconButton>
		</Box>
	);
}

export default ThemeSwitcher;

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppStore} from './store/app';
import HomeBase from './views/home-base';
import ToDoListView from './views/todo-list';
import Layout from './components/layout';

function App() {
	const theme = useAppStore((state) => state.theme);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout>
				<Routes>
					<Route path="/" element={<HomeBase />} />
				</Routes>
			</Layout>
		</ThemeProvider>
	);
}

export default App;

import {Delete, NoteAddTwoTone} from '@mui/icons-material';
import {
	Container,
	Typography,
	Dialog,
	DialogContent,
	Card,
	Toolbar,
	Divider,
	IconButton,
	DialogTitle,
	DialogActions,
	TextField,
	Button,
	List,
	ListItem,
	ListItemButton,
	Checkbox,
	ListItemText,
} from '@mui/material';
import React, {useState} from 'react';
import {useFlags} from 'launchdarkly-react-client-sdk';
import {useAppStore} from '../store/app';

export default function ToDoListView() {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const todos = useAppStore((state) => state.todos);
	const addToDo = useAppStore((state) => state.addToDo);
	const removeToDo = useAppStore((state) => state.removeToDo);
	const toggleToDoComplete = useAppStore((state) => state.toggleToDoComplete);
	const {createToDoItem, deleteToDoItem} = useFlags();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const save = () => {
		addToDo({
			title,
			description,
		});
		setDescription('');
		setTitle('');
		handleClose();
	};

	const deleteToDo = (id) => {
		removeToDo(id);
	};

	const completeToDo = (id) => {
		toggleToDoComplete(id);
	};

	return (
		<Container sx={{textAlign: 'center', mx: 'auto'}}>
			<Dialog
				open={open}
				sx={{width: 500, textAlign: 'center', mx: 'auto'}}
				onClose={handleClose}
			>
				<DialogTitle variant="h3">New ToDo</DialogTitle>
				<Divider />
				<DialogContent>
					<TextField
						fullWidth
						variant="filled"
						label="Title*"
						placeholder="Learn how to use Feature Flags to ship faster"
						onChange={(event) => {
							setTitle(event.target.value);
						}}
					/>
					<TextField
						fullWidth
						multiline
						variant="filled"
						label="Description*"
						placeholder="Let's start by using feature flags in our Vue application using the LaunchDarkly React SDK"
						onChange={(event) => {
							setDescription(event.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button fullWidth variant="contained" color="primary" onClick={save}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			<Typography variant="body2" sx={{mt: 10}}>
				Welcome to
			</Typography>

			<Typography variant="h2" className="heroText">
				ToDo List with React
			</Typography>

			<Card sx={{mx: 'auto', maxWidth: 600}} elevation={20}>
				<Toolbar>
					<Typography variant="h5" sx={{flexGrow: 1, textAlign: 'left'}}>
						ToDo List
					</Typography>
					<Divider />
					{createToDoItem && (
						<IconButton
							size="large"
							aria-label="create new todo"
							onClick={handleClickOpen}
						>
							<NoteAddTwoTone fontSize="inherit" />
						</IconButton>
					)}
				</Toolbar>
				<List sx={{width: '100%', maxWidth: 600, bgcolor: 'background.paper'}}>
					{todos.map((todo) => (
						<ListItem
							key={todo.title}
							secondaryAction={
								deleteToDoItem && (
									<IconButton
										edge="end"
										aria-label="delete todo"
										onClick={() => {
											deleteToDo(todo.id);
										}}
									>
										<Delete />
									</IconButton>
								)
							}
						>
							<ListItemButton>
								<Checkbox
									disableRipple
									edge="start"
									checked={todo.isComplete}
									tabIndex={-1}
									onClick={() => {
										completeToDo(todo.id);
									}}
								/>
								<ListItemText primary={todo.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Card>
		</Container>
	);
}

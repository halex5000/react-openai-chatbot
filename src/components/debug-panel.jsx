import PropTypes from 'prop-types';
import React from 'react';
import {JsonViewer} from '@textea/json-viewer';
import {
	Card,
	Drawer,
	Typography,
	IconButton,
	Toolbar,
	Container,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import {ExpandMore, ExpandLess} from '@mui/icons-material/';
import {useAppStore} from '../store/app';

export const ocean = {
	scheme: 'Ocean',
	author: 'Chris Kempson (http://chriskempson.com)',
	base00: '#2b303b',
	base01: '#343d46',
	base02: '#4f5b66',
	base03: '#65737e',
	base04: '#a7adba',
	base05: '#c0c5ce',
	base06: '#dfe1e8',
	base07: '#eff1f5',
	base08: '#bf616a',
	base09: '#d08770',
	base0A: '#ebcb8b',
	base0B: '#a3be8c',
	base0C: '#96b5b4',
	base0D: '#8fa1b3',
	base0E: '#b48ead',
	base0F: '#ab7967',
};

function DebugPanel({isOpen, toggleDebugDrawer}) {
	const allState = useAppStore((state) => state.allState);
	const stateItems = allState();

	return (
		<Drawer
			open={isOpen}
			anchor="bottom"
			sx={{width: 600, height: 500}}
			variant="temporary"
		>
			<Container>
				<Toolbar>
					<Typography variant="h5">
						Debug Panel
						<IconButton size="xsmall" sx={{ml: 5}} onClick={toggleDebugDrawer}>
							{isOpen ? <ExpandMore /> : <ExpandLess />}
						</IconButton>
					</Typography>
				</Toolbar>

				<Card>
					<Toolbar>Items in State</Toolbar>
					<Divider />
					{stateItems.map((item) => {
						return (
							<Accordion key={item.key}>
								<AccordionSummary>{item.key}</AccordionSummary>
								<AccordionDetails>
									<JsonViewer theme={ocean} value={item.value} />
								</AccordionDetails>
							</Accordion>
						);
					})}
				</Card>
			</Container>
		</Drawer>
	);
}

DebugPanel.propTypes = {
	isOpen: PropTypes.bool,
	toggleDebugDrawer: PropTypes.func,
};

export default DebugPanel;

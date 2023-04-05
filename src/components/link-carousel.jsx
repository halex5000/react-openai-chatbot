import React from 'react';
import Icon from '@mui/material/Icon';
import {Paper, Typography, Box, Divider, Button} from '@mui/material';
import {useFlags} from 'launchdarkly-react-client-sdk';
import Carousel from 'react-material-ui-carousel';
import {useAppStore} from '../store/app';

function LinkCarousel() {
	const {carouselItems} = useFlags();
	const theme = useAppStore((state) => state.themeName);

	if (carouselItems) {
		return (
			<Paper
				elevation={theme === 'dark' ? 1 : 12}
				sx={{
					minHeight: 325,
					maxHeight: 300,
					maxWidth: 600,
					width: '100%',
					mx: 'auto',
				}}
			>
				<Carousel
					dots
					infinite
					autoPlay
					animation="slide"
					duration={250}
					interval={6000}
					slidesToShow={1}
					slidesToScroll={1}
				>
					{carouselItems.map((item) => (
						<Box key={item.title} sx={{textAlign: 'center'}}>
							<Box sx={{height: 112}}>
								<Icon color="primary" sx={{fontSize: 112, mb: 3}}>
									{item.icon.slice(4)}
								</Icon>
							</Box>

							<Typography variant="h5" sx={{mb: 3, pt: 1}}>
								{item.title}
							</Typography>

							<Box sx={{height: 50, mb: 3, pt: 2}}>
								<Typography>{item.subtitle}</Typography>
							</Box>

							<Divider sx={{mb: 2}} />
							<Box sx={{textAlign: 'right'}}>
								<Button
									disableElevation
									color="neutral"
									sx={{
										minWidth: 164,
										border: 0.25,
										color: theme === 'dark' ? '#e6e6e6' : 'primary',
										mr: 2,
										mb: 2,
									}}
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									{item.label}
								</Button>
							</Box>
						</Box>
					))}
				</Carousel>
			</Paper>
		);
	}

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<></>
	);
}

export default LinkCarousel;

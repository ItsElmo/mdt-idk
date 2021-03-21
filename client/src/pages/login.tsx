import React, { useState } from 'react';
import {
	Container,
	Box,
	Heading,
	Circle,
	background,
	useColorMode,
	Button,
} from '@chakra-ui/react';
import { InputField } from '../Components/inputField';

export const Login: React.FC = () => {
	return (
		<Container maxw="container.xl" colorScheme="red">
			<Box
				color="darkred"
				padding="2"
				letterSpacing="wide"
				bgSize="cover"
				mx={-440}
				alignContent="center"
			>
				<Heading size="lg">Unity EMS</Heading>
			</Box>

			<Circle>
				<Box shadow="base" ml={-20}>
					Logo Place holder
				</Box>
			</Circle>
			<Box>
				<InputField label="Username" name="username" />
			</Box>
		</Container>
	);
};

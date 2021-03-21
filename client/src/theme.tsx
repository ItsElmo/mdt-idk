// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		gray: {
			'50': '#F2F2F2',
			'100': '#DBDBDB',
			'200': '#C4C4C4',
			'300': '#ADADAD',
			'400': '#969696',
			'500': '#808080',
			'600': '#666666',
			'700': '#4D4D4D',
			'800': '#333333',
			'900': '#1A1A1A',
		},
		red: {
			'50': '#FFE5E5',
			'100': '#FFB8B8',
			'200': '#FF8A8A',
			'300': '#FF5C5C',
			'400': '#FF2E2E',
			'500': '#FF0000',
			'600': '#CC0000',
			'700': '#990000',
			'800': '#660000',
			'900': '#330000',
		},
	},
});

export default theme;

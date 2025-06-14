import { createTheme } from '@mui/material/styles';

const COLORS = {
    primary: '#F0A500',
    secondary: '#E45826',
    tableHeadBackground: '#000000',
    tableHeadColor: '#F0A500',
    tableRowBackground: 'rgba(255, 204, 0, 0.1)',
};

const FONT_SIZES = {
    tableBodyFontSize: '1.0625rem',
};

const theme = createTheme({
    palette: {
        primary: {
            main: COLORS.primary,
        },
        secondary: {
            main: COLORS.secondary,
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    '&.MuiTableCell-head': {
                        backgroundColor: COLORS.tableHeadBackground,
                        color: COLORS.tableHeadColor,
                    },
                    '&.MuiTableCell-body': {
                        fontSize: FONT_SIZES.tableBodyFontSize,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(odd)': {
                        backgroundColor: COLORS.tableRowBackground,
                    },
                    '&:last-child td, &:last-child th': {
                        border: 0,
                    },
                },
            },
        },
    },
});

export default theme;

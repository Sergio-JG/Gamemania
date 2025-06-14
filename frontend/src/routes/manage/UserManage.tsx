
import RoleDialog from '../../components/RoleDialog';
import SocialDialog from '../../components/dialog/SocialDialog';
import axios from 'axios';
import { User } from '../../interfaces/GameInterface'
import HeaderAdmin from '../../components/HeaderAdmin';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Pagination, Typography } from '@mui/material';
import { useState, useReducer, useEffect } from 'react';
import FooterAdmin from '../../components/FooterAdmin';
import AddressDialog from '../../components/dialog/AddressDialog';
import CreditCardDialog from '../../components/dialog/CreditCardDialog';

const UserManage: React.FC = () => {

    const API_URL = 'http://localhost:8080/user';

    type StateType = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        openCreditCardPopup: any;
        openAddressPopup: boolean;
        openRolePopup: boolean;
        openSocialPopup: boolean;
        selectedUser: User | null;
    };

    type ActionType =
        | { type: 'OPEN_ADDRESS_POPUP'; payload: User }
        | { type: 'CLOSE_ADDRESS_POPUP' }
        | { type: 'OPEN_CREDITCARD_POPUP'; payload: User }
        | { type: 'CLOSE_CREDITCARD_POPUP' }
        | { type: 'OPEN_ROLE_POPUP'; payload: User }
        | { type: 'CLOSE_ROLE_POPUP' }
        | { type: 'OPEN_SOCIAL_POPUP'; payload: User }
        | { type: 'CLOSE_SOCIAL_POPUP' };


    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);

    const initialState = {
        openAddressPopup: false,
        openRolePopup: false,
        openSocialPopup: false,
        openCreditCardPopup: false,
        selectedUser: null
    };

    const reducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'OPEN_ADDRESS_POPUP':
                return { ...state, openAddressPopup: true, selectedUser: action.payload };
            case 'CLOSE_ADDRESS_POPUP':
                return { ...state, openAddressPopup: false, selectedUser: null };
            case 'OPEN_ROLE_POPUP':
                return { ...state, openRolePopup: true, selectedUser: action.payload };
            case 'CLOSE_ROLE_POPUP':
                return { ...state, openRolePopup: false, selectedUser: null };
            case 'OPEN_SOCIAL_POPUP':
                return { ...state, openSocialPopup: true, selectedUser: action.payload };
            case 'CLOSE_SOCIAL_POPUP':
                return { ...state, openSocialPopup: false, selectedUser: null };
            case 'OPEN_CREDITCARD_POPUP':
                return { ...state, openCreditCardPopup: true, selectedUser: action.payload };
            case 'CLOSE_CREDITCARD_POPUP':
                return { ...state, openCreditCardPopup: false, selectedUser: null };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_URL);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSocialPopUp = (user: User) => {
        dispatch({ type: 'OPEN_SOCIAL_POPUP', payload: user });
    };

    const handleRolePopUp = (user: User) => {
        dispatch({ type: 'OPEN_ROLE_POPUP', payload: user });
    };

    const handleAddressPopUp = (user: User) => {
        dispatch({ type: 'OPEN_ADDRESS_POPUP', payload: user });
    };

    const handleCreditCardPopUp = (user: User) => {
        dispatch({ type: 'OPEN_CREDITCARD_POPUP', payload: user });
    };

    const handleAddressPopUpClose = () => {
        dispatch({ type: 'CLOSE_ADDRESS_POPUP' });
    };

    const handleCreditCardPopUpClose = () => {
        dispatch({ type: 'CLOSE_CREDITCARD_POPUP' });
    };

    const handleRolePopUpClose = () => {
        dispatch({ type: 'CLOSE_ROLE_POPUP' });
    };

    const handleSocialPopUpClose = () => {
        dispatch({ type: 'CLOSE_SOCIAL_POPUP' });
    };

    return (
        <div>
            <HeaderAdmin />
            <Grid container justifyContent={'center'} paddingY={4}>
                <Typography variant='h3'> Gestión de usuarios </Typography>
            </Grid>
            <Grid padding={5}>
                <TableContainer component={Paper} sx={{ minHeight: '61vh' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Contraseña</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Foto de perfil</TableCell>
                                <TableCell>Social</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Direccion</TableCell>
                                <TableCell>Tarjeta de credito</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user: User) => (
                                <TableRow key={user.userId}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell> ***** </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.phone} </TableCell>
                                    <TableCell>{user.profilePic}</TableCell>
                                    <TableCell onClick={user.social ? () => handleSocialPopUp(user) : undefined}>
                                        {user.social ? 'ver social...' : 'No hay datos'}
                                    </TableCell>
                                    <TableCell onClick={user.role ? () => handleRolePopUp(user) : undefined}>
                                        {user.role ? 'ver rol...' : 'No hay datos'}
                                    </TableCell>
                                    <TableCell onClick={user.address ? () => handleAddressPopUp(user) : undefined}>
                                        {user.address ? 'ver cuenta...' : 'No hay datos'}
                                    </TableCell>
                                    <TableCell onClick={user.creditCard ? () => handleCreditCardPopUp(user) : undefined}>
                                        {user.creditCard ? 'ver creditCard...' : 'No hay datos'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <Pagination
                            count={Math.ceil(users.length / 9)}
                            page={page}
                            onChange={(_event, value) => setPage(value)}
                        />
                    </Table>
                </TableContainer>
            </Grid>
            <FooterAdmin />
            <CreditCardDialog open={state.openCreditCardPopup} onClose={handleCreditCardPopUpClose} selectedUser={state.selectedUser} />
            <AddressDialog open={state.openAddressPopup} onClose={handleAddressPopUpClose} selectedUser={state.selectedUser} />
            <RoleDialog open={state.openRolePopup} onClose={handleRolePopUpClose} selectedUser={state.selectedUser} />
            <SocialDialog open={state.openSocialPopup} onClose={handleSocialPopUpClose} selectedUser={state.selectedUser} />
        </div>
    );
};

export default UserManage;

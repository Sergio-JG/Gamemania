import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import theme from './styles/themes';

import GameDetailView from './routes/GameDetailView';

import Home from './routes/Home';
import Login from './routes/LoginView';
import RegisterView from './routes/RegisterView';
import Profile from './routes/ProfileView';
import BuyPlatform from './routes/BuyPlatform';

import UserManage from './routes/manage/UserManage';
import GameManage from './routes/manage/GameManage';
import ProviderManage from './routes/manage/ProviderManage';
import SaleManage from './routes/manage/SaleManage';
import PurchaseManage from './routes/manage/PurchaseManage';

import { CartProvider } from './components/CartContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/game/:id' element={<GameDetailView />} />
          <Route path='/register' element={<RegisterView />} />
          <Route path='/buyPlatform' element={<BuyPlatform />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/dashboard/user' element={<UserManage />} />
          <Route path='/dashboard/game' element={<GameManage />} />
          <Route path='/dashboard/sale' element={<SaleManage />} />
          <Route path='/dashboard/purchase' element={<PurchaseManage />} />
          <Route path='/dashboard/provider' element={<ProviderManage />} />

        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

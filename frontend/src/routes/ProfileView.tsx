import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Divider } from '@mui/material';
import { Sale, User } from '../interfaces/GameInterface';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import PersonalInfo from '../components/PersonalInfo';
import SocialComponent from '../components/SocialComponent';
import AddressComponent from '../components/AddressComponent';
import CreditCardComponent from '../components/CreditCardComponent';

const Profile: React.FC = () => {

  // USER
  const [userData, setUserData] = useState<User>({} as User);

  // SALE
  const [saleData, setSaleData] = useState<Sale[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  // PAGINATION
  const totalPages = Math.ceil(saleData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = saleData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`);
      const result = response.data;
      setUserData(result);
    } catch (error) {
      console.error('ERROR fetching personal info:', error);
    }
  };

  const fetchSaleData = async () => {
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '';
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sale/byUser/${userId}`);
      setSaleData(response.data);
    } catch (error) {
      console.error('ERROR fetching sale data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchSaleData();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto px-2 sm:px-8 md:px-24 lg:px-32 py-8 bg-neutral-800 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Profile details */}
          <div className="rounded-2xl shadow-lg p-8 flex-1 border border-gray-700 bg-[#18181b] min-w-0 flex flex-col gap-10">
            {/* Personal Info */}
            <PersonalInfo userData={userData} fetchUserData={fetchUserData} />
            {/* Social Data */}
            <SocialComponent userData={userData} fetchUserData={fetchUserData} />
            {/* Address */}
            <AddressComponent userData={userData} fetchUserData={fetchUserData} />
            {/* CreditCard  */}
            <CreditCardComponent userData={userData} fetchUserData={fetchUserData} />
          </div>
          {/* Right column: Sales */}
          <div className="bg-[#18181b] rounded-2xl shadow-lg p-8 flex-1 min-w-0 border border-gray-700">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-white tracking-tight">
              Mis compras
            </h2>
            <div className="space-y-6">
              {currentItems.map((sale, index) => (
                <div key={index} className="mb-4">
                  <div className="text-xl font-semibold mb-2 text-white">
                    COMPRA: {new Date(sale.saleDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {sale.saleDetail.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="border border-gray-700 rounded-lg p-4 min-w-[200px] flex-1 bg-neutral-700"
                      >
                        <div className="font-semibold text-white">{detail.gameName}</div>
                        <div className="text-gray-300 text-sm">Cantidad: {detail.quantity}</div>
                        <div className="text-gray-300 text-sm">Precio unitario: {detail.unitPrice}</div>
                        <div className="text-gray-300 text-sm">Subtotal: {detail.subtotal}</div>
                      </div>
                    ))}
                  </div>
                  <Divider className="my-6" />
                </div>
              ))}
            </div>
            {saleData.length > 0 ? (
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-blue-600 font-bold"
                >
                  Anterior
                </Button>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-blue-600 font-bold"
                >
                  Siguiente
                </Button>
              </div>
            ) : (
              <div className="flex justify-center mt-6">
                <span className="text-red-400 font-semibold">No hay compras disponibles</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;

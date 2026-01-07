import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'>
      <Header />
      <main className="flex-1 py-8 px-2 md:px-0">
        <div className="max-w-5xl mx-auto bg-white/80 rounded-xl shadow-lg p-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null
}

export default App

import './index.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import SearchHistoryPage from './pages/SearchHistoryPage';
import NotFoundPage from './pages/404';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthUser } from './store/authUser';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import WatchPage from './pages/WatchPage';
import { Navigate } from 'react-router-dom';

function App() {

  const {isCheckingAuth, user, authCheck} = useAuthUser();
  useEffect(() => {
    authCheck();
  },[authCheck])

  if (isCheckingAuth) {
    return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin text-red-600 size-10" />
      </div>
    </div>
    );
  }
  
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to="/login" />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      
    </>
    
  )
}

export default App;

import './index.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthUser } from './store/authUser';
import { useEffect } from 'react';

function App() {

  const {isCheckingAuth, user, authCheck} = useAuthUser();
  useEffect(() => {
    authCheck();
  },[])
  console.log(user, isCheckingAuth);
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
      
    </>
    
  )
}

export default App;

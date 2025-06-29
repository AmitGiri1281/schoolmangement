// src/components/auth/AuthInitializer.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../store/slices/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
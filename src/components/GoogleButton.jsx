import React, { useContext } from 'react';
import { loginComGoogle } from '../utils/loginComGoogle';
import { UserContext } from '../contexts/UserContext';

const GoogleButton = () => {
  const { setUser } = useContext(UserContext);

  const handleClick = async () => {
    await loginComGoogle(setUser);
  };

  return <button className='LoginButton' onClick={handleClick}>Entrar com Google</button>;
};

export default GoogleButton;

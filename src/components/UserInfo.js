import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const UserInfo = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  return (
    <div className='UserInfo'>
      <img src={user.picture} alt="Foto do usuário"/>
      <span>{user.name}</span>
    </div>
  );
};

export default UserInfo;

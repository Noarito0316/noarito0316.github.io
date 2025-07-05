import React from 'react';
import  supabase  from '../DB_client';

const GoogleLoginButton = () => {
  const handleLogin = async () => {
    const currentPath = window.location.pathname;
    localStorage.setItem('redirect_after_login', currentPath);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/#/login`,
      },
    });

    if (error) console.error('Erro ao iniciar login:', error);
  };

  return (
    <button className="LoginButton" onClick={handleLogin}>
      Entrar com Google
    </button>
  );
};

export default GoogleLoginButton;

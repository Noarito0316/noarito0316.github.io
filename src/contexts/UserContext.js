import React, { createContext, useEffect, useState } from 'react';
import supabase from '../utils/DB_client';
import { handleLoginRedirect } from '../utils/loginComGoogle';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    // Corrige a URL com dois hashes
    if (window.location.href.includes('#') && window.location.href.includes('#access_token')) {
      const parts = window.location.href.split('#');
      const base = parts[0];
      const path = parts[1];
      const hashParams = parts[2];
    
      // Substitui por hash válido
      window.location.href = `${base}#${path}&${hashParams}`;
    }

    // Tenta recuperar e registrar (se for primeiro login)
    handleLoginRedirect(setUser);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata.full_name,
          email: session.user.email,
          picture: session.user.user_metadata.avatar_url
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

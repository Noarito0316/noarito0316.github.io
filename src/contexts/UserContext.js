import React, { createContext, useEffect, useState } from 'react';
import  supabase  from '../DB_client';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {  
        setUser({
          name: session.user.user_metadata.full_name,
          picture: session.user.user_metadata.avatar_url,
          email: session.user.email,
          id: session.user.id
        });
      }
    };

    getSession();

    // Atualiza automaticamente ao logar/deslogar
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name,
          picture: session.user.user_metadata.avatar_url,
          email: session.user.email,
          id: session.user.id
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

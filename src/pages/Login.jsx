import { useRef, useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import supabase from '../utils/DB_client';
import { UserContext } from '../contexts/UserContext';

const SessionLoader = () => {
  const { setUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const sessionHandled = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    const processSession = async (session) => {
      if (!session?.user) return;
    
      const user = session.user;
    
      setUser({
        name: user.user_metadata.full_name,
        picture: user.user_metadata.avatar_url,
        email: user.email,
        id: user.id,
      });
    
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('google_id', user.id)
        .single();
    
      if (!existingUser) {
        await supabase.from('users').insert([
          {
            google_id: user.id,
            name: user.user_metadata.full_name,
            email: user.email,
            picture_url: user.user_metadata.avatar_url,
          },
        ]);
      }
    
      setLoaded(true);
    };
  
      supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !sessionHandled.current) {
        sessionHandled.current = true;
        processSession(session);
      } else {
        console.log('[SessionLoader] Sessão ainda não disponível, aguardando evento...');
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!sessionHandled.current && event === 'SIGNED_IN') {
        sessionHandled.current = true;
        processSession(session);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  if (!loaded) {
    return <p>Carregando sessão...</p>;
  }

  return <Outlet />;
};

export default SessionLoader;

// src/components/LoginRedirect.js
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  supabase  from '../DB_client';
import { UserContext } from '../contexts/UserContext';

const LoginRedirect = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const processLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const userData = session.user;

        // Salva no contexto
        setUser({
          name: userData.user_metadata.full_name,
          picture: userData.user_metadata.avatar_url,
          email: userData.email,
          id: userData.id,
        });

        // Verifica se já existe no banco
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('google_id', userData.id)
          .single();

        if (!existingUser) {
          await supabase.from('users').insert([
            {
              google_id: userData.id,
              name: userData.user_metadata.full_name,
              email: userData.email,
              picture_url: userData.user_metadata.avatar_url,
            },
          ]);
        }

        const target = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');
        navigate(target);
      }
    };

    processLogin();
  }, [navigate, setUser]);

  return <p>Conectando e redirecionando...</p>;
};

export default LoginRedirect;

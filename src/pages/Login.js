import React, { useEffect } from 'react';
import  supabase  from '../DB_client';

class Login extends React.Component {


  handleLogin = async () => {
    
    //salva tora atual no storage para redirecionar depois do login
    //isso é necessário porque o supabase não redireciona automaticamente para a página que
    //o usuário estava antes de fazer o login
    const currentPath = window.location.pathname;
    localStorage.setItem('redirect_after_login', currentPath);
    
    // Define a URL de redirecionamento após o login
    const redirectUrl = `${window.location.origin}/login`;
    
    const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
    redirectTo: redirectUrl,
  },
  });
    if (error) console.error('Erro ao iniciar login:', error);
  };

  async componentDidMount() {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const user = session.user;
        // Verifica se o usuário já existe na tabela 'users'
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('google_id', user.id)
          .single();

        if (!existingUser) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              google_id: user.id,
              name: user.user_metadata.full_name,
              email: user.email,
              picture_url: user.user_metadata.avatar_url,
            },
          ]);

          if (insertError) console.error('Erro ao registrar usuário:', insertError);
          else console.log('Usuário registrado!');
        } else {
          console.log('Usuário já existe:', existingUser);
        }


          // Redireciona de volta para a rota original salva antes do login
        const target = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');
        window.location.href = target;
      }
    });
  }


  render() {
    return (
      <section className="bodycontainer">
        <div>
          <h2>Login com Supabase (Google)</h2>
          <button onClick={this.handleLogin}>Entrar com Google</button>
        </div>
      </section>
    )
  }
}

export default Login;
import supabase from './DB_client';

let alreadyHandled = false;

export const loginComGoogle = async () => {
  console.log('[LoginGoogle] Função loginComGoogle chamada');

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/#/login`
    }
  });

  if (error) console.error('[LoginGoogle] Erro ao iniciar login:', error);
  else console.log('[LoginGoogle] Redirecionando para login do Google...');
};

export const handleLoginRedirect = async (setUser) => {
  if (alreadyHandled) return;
  alreadyHandled = true;

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    console.error('[LoginRedirect] Erro ao recuperar sessão:', error);
    return;
  }

  const user = session.user;
  const google_id = user.id;
  const name = user.user_metadata.full_name;
  const email = user.email;
  const picture_url = user.user_metadata.avatar_url;

  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('google_id', google_id);

  if (fetchError) {
    console.error('[LoginRedirect] Erro ao buscar usuário no banco:', fetchError);
    return;
  }

  if (existingUser.length === 0) {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ google_id, name, email, picture_url }]);

    if (insertError) {
      console.error('[LoginRedirect] Erro ao inserir usuário no banco:', insertError);
      return;
    }

    console.log('[LoginRedirect] Novo usuário registrado no banco.');
  } else {
    console.log('[LoginRedirect] Usuário já registrado:', existingUser[0]);
  }

  setUser({ id: google_id, name, email, picture: picture_url });
};

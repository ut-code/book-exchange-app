import React, { useState } from 'react';
import { useSigninUserMutation, useUsersQuery } from '../../pages/user/query.generated';
import SigninUserPresenter from './SigninUserPresenter';

export default function SigninUserContainer() {
  const [signinUser] = useSigninUserMutation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await signinUser({
        variables: {
          signinUserInput: {
            username: name,
            password,
          },
        },
      });
      alert('signin success');
      localStorage.setItem('accessToken', response.data?.signinUser.accessToken ?? '');
    } catch (error) {
      alert('Error:' + error);
    }
  };

  return (
    <SigninUserPresenter isDisabled={!name || !password} name={name} setName={setName} password={password} setPassword={setPassword} handleSignin={handleSignin} />
  );
}

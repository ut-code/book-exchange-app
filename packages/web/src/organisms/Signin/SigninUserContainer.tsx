import React, { useState } from 'react';
import { useSigninUserMutation } from '../../pages/user/query.generated';
import SigninUserPresenter from './SigninUserPresenter';

type SigninUserProps = {
  refetchUser: () => void;
}; 

export default function SigninUserContainer({ refetchUser }: SigninUserProps) {

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
      await refetchUser();
    } catch (error) {
      alert('Error:' + error);
    }
  };

  return (
    <SigninUserPresenter isDisabled={!name || !password} name={name} setName={setName} password={password} setPassword={setPassword} handleSignin={handleSignin} />
  );
}

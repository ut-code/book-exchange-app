import React, { useState } from 'react';
import { useAllUsersQuery, useSignupUserMutation } from './query.generated';

export default function UserPage() {
  const { data } = useAllUsersQuery();
  const [signupUser, { error: signupError }] = useSignupUserMutation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupUser({
        variables: {
          userCreateInput: {
            email,
            name,
            password,
          },
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>hello</div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
        {signupError && <div>Error: {signupError.message}</div>}
      </div>
      {data?.allUsers?.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}

import { Meta, Story } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import SigninUserPresenter, { SignupUserPresenterProps } from './SigninUserPresenter';

export default {
  title: 'Components/SigninUserPresenter',
  component: SigninUserPresenter,
} as Meta;

const Template: Story<SignupUserPresenterProps> = (args) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignin = useCallback(async () => {
    console.log('Handle signin called with:', name, password);
  }, [name, password]);

  return <SigninUserPresenter {...args} name={name} setName={setName} password={password} setPassword={setPassword} handleSignin={handleSignin} />;
};

export const Default = Template.bind({});
Default.args = {
  isDisabled: false
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  isDisabled: true
};

// ShareLinkButton.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import ShareLinkButton, { ShareLinkButtonProps } from './ShareLinkButtonPresenter';

export default {
  title: 'Components/ShareLinkButton',
  component: ShareLinkButton,
  args: {
    isDisabled: false,
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<ShareLinkButtonProps> = (args) => <ShareLinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

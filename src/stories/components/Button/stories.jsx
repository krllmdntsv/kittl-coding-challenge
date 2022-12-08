import React, { useState } from 'react';

import { within, userEvent } from '@storybook/testing-library';
import { css, ThemeProvider } from 'styled-components';

import { BookmarkIcon } from 'components/Icon';
import { Radio } from 'components/Radio';
import { themeList } from 'utils/theme';

import { Button } from './Button';

const themeOptions = themeList.map((item) => ({ key: item.name, label: item.name, value: item.name }));

export default {
  title: 'Example/Button',
  component: Button,
};

function Template(args) {
  return <Button {...args} />;
}

function ThemeTemplate(args) {
  const [value, setValue] = useState('Default');

  const theme = themeList.find((item) => item.name === value).value;

  return (
    <ThemeProvider theme={theme}>
      <Radio direction="column" options={themeOptions} value={value} onChange={setValue} />
      <Button {...args} />
    </ThemeProvider>
  );
}

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
};

export const Caret = Template.bind({});

Caret.args = {
  caret: true,
};

export const Icon = Template.bind({});

Icon.args = {
  icon: <BookmarkIcon />,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const OnClick = Template.bind({});

OnClick.args = {
  // eslint-disable-next-line no-alert
  onClick: () => alert('click'),
};

function FormTemplate(args) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert('submit');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <p>
        <label>
          Username
          <br />
          <input name="username" placeholder="Type username" type="text" />
        </label>
      </p>
      <p>
        <label>
          Password
          <br />
          <input name="password" placeholder="Type password" type="password" />
        </label>
      </p>
      <Template {...args} />
    </form>
  );
}

const formPlay = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const userNameInput = canvas.getByLabelText('Username', {
    selector: 'input',
  });

  await userEvent.type(userNameInput, 'John', {
    delay: 100,
  });

  const passwordInput = canvas.getByLabelText('Password', {
    selector: 'input',
  });

  await userEvent.type(passwordInput, 'Password', {
    delay: 100,
  });

  const actionButton = canvas.getByRole('button');

  await userEvent.click(actionButton);
};

export const FormReset = FormTemplate.bind({});

FormReset.args = {
  htmlType: 'reset',
  children: 'Reset',
};

FormReset.play = formPlay;

export const FormSubmit = FormTemplate.bind({});

FormSubmit.args = {
  htmlType: 'submit',
  children: 'Submit',
};

FormSubmit.play = formPlay;

export const Theme = ThemeTemplate.bind({});

Theme.args = {
  styles: css`
    margin-top: 24px;
  `,
};

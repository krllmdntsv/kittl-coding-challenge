import React from 'react';

import { within } from '@storybook/testing-library';
import { fireEvent } from '@testing-library/react';

import { Arch } from './Arch';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  title: 'Example/Arch',
  component: Arch,
};

export function Template(args) {
  return <Arch {...args} />;
}

Template.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const directionInput = canvas.getByRole('slider');
  const radioInputList = canvas.getAllByRole('radio');

  await sleep(500);
  fireEvent.change(directionInput, { target: { value: 5 } });

  await sleep(500);
  fireEvent.change(directionInput, { target: { value: 10 } });

  await sleep(500);
  fireEvent.click(radioInputList[1]);

  await sleep(500);
  fireEvent.click(radioInputList[2]);

  await sleep(500);
  fireEvent.click(radioInputList[3]);
};

// form testing
// http://localhost:3000/login

import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {build, fake} from '@jackfranklin/test-data-bot';
import Login from '../../components/login';

const buildLoginForm = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
});

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const {username, password} = buildLoginForm();
  const usernameElement = screen.getByLabelText(/username/i);
  const passwordElement = screen.getByLabelText(/password/i);

  userEvent.type(usernameElement, username);
  userEvent.type(passwordElement, password);
  userEvent.click(screen.getByRole('button'));

  console.log(username, password);

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

/*
eslint
  no-unused-vars: "off",
*/

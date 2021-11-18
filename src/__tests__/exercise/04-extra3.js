// form testing
// http://localhost:3000/login

import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Login from '../../components/login';

const buildLoginForm = overrides => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  return {username, password, ...overrides};
};

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const {username, password} = buildLoginForm({username: 'Dean'});
  // Allows for any randomly generated username and pw to be tested. Shows other testers that the particular values of UN and PW don't matter - there isn't special logic around particular cases!
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

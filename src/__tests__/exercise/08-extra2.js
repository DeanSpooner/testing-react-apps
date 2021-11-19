// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import {render, act} from '@testing-library/react';
import useCounter from '../../components/use-counter';

const setup = ({initialProps} = {}) => {
  const result = {};
  const TestComponent = props => {
    result.current = useCounter(props);
    return null;
  };
  render(<TestComponent {...initialProps} />);
  return result;
};

test('exposes the count and increment/decrement functions', () => {
  const result = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.increment());
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  expect(result.current.count).toBe(-1);
});

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 88}});
  expect(result.current.count).toBe(88);
});

test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 4}});
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(4);
  act(() => result.current.increment());
  act(() => result.current.increment());
  act(() => result.current.increment());
  expect(result.current.count).toBe(16);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(12);
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  expect(result.current.count).toBe(-4);
});

test('allows customization of the step and initial count', () => {
  const result = setup({initialProps: {step: 3, initialCount: 15}});
  expect(result.current.count).toBe(15);
  act(() => result.current.increment());
  expect(result.current.count).toBe(18);
  act(() => result.current.increment());
  act(() => result.current.increment());
  act(() => result.current.increment());
  expect(result.current.count).toBe(27);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(24);
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  act(() => result.current.decrement());
  expect(result.current.count).toBe(12);
});

/* eslint no-unused-vars:0 */

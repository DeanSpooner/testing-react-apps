// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import {render, act} from '@testing-library/react';
import useCounter from '../../components/use-counter';

test('exposes the count and increment/decrement functions', () => {
  let result;
  const TestComponent = () => {
    result = useCounter();
    return null;
  };
  render(<TestComponent />);
  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.increment());
  act(() => result.increment());
  expect(result.count).toBe(3);
  act(() => result.decrement());
  expect(result.count).toBe(2);
  act(() => result.decrement());
  act(() => result.decrement());
  act(() => result.decrement());
  expect(result.count).toBe(-1);
});

/* eslint no-unused-vars:0 */

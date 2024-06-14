import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Group from './Group';

const renderWithProviders = (ui, { reduxState } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

test('renders Group component and handles input changes', () => {
  const group = { from: 1, to: 5 };
  renderWithProviders(<Group index={0} group={group} />);

  const fromInput = screen.getByLabelText(/From:/i);
  const toInput = screen.getByLabelText(/To:/i);

  expect(fromInput.value).toBe('1');
  expect(toInput.value).toBe('5');

  fireEvent.change(fromInput, { target: { value: '2' } });
  expect(fromInput.value).toBe('2');

  fireEvent.change(toInput, { target: { value: '6' } });
  expect(toInput.value).toBe('6');
});

test('handles removing group', () => {
  const group = { from: 1, to: 5 };
  renderWithProviders(<Group index={0} group={group} />);

  const deleteButton = screen.getByRole('button', { name: /trash/i });
  fireEvent.click(deleteButton);

  // After clicking delete, the group should no longer be in the DOM
  expect(screen.queryByText(/Group 1/i)).not.toBeInTheDocument();
});

test('shows status when Show Status button is clicked', async () => {
  const group = { from: 1, to: 5 };
  renderWithProviders(<Group index={0} group={group} />);

  const showStatusButton = screen.getByRole('button', { name: /show status/i });
  fireEvent.click(showStatusButton);

  // Mocking the API response might be necessary here
  // Example:
  // jest.mock('axios', () => ({
  //   get: jest.fn(() => Promise.resolve({ data: { completed: true } }))
  // }));

  // Ensure the status items are rendered
  const statusItem = await screen.findByText('(1) True');
  expect(statusItem).toBeInTheDocument();
});

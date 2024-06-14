import { createStore } from 'redux';
import reducer, { addGroup, removeGroup, updateGroup, setStatuses, setError } from './store';

let store;

beforeEach(() => {
  store = createStore(reducer);
});

test('should handle adding a group', () => {
  store.dispatch(addGroup({ from: 6, to: 8 }));
  const state = store.getState();
  expect(state.groups).toEqual([{ from: 1, to: 5 }, { from: 6, to: 8 }]);
});

test('should handle removing a group', () => {
  store.dispatch(removeGroup(0));
  const state = store.getState();
  expect(state.groups).toEqual([]);
});

test('should handle updating a group', () => {
  store.dispatch(updateGroup(0, { from: 2, to: 5 }));
  const state = store.getState();
  expect(state.groups).toEqual([{ from: 2, to: 5 }]);
});

test('should handle setting statuses', () => {
  const statuses = { 1: true, 2: false, 3: true };
  store.dispatch(setStatuses(0, statuses));
  const state = store.getState();
  expect(state.statuses[0]).toEqual(statuses);
});

test('should handle setting an error', () => {
  const error = 'Test error message';
  store.dispatch(setError(error));
  const state = store.getState();
  expect(state.error).toEqual(error);
});

 

import { createStore } from 'redux';

const initialState = {
  groups: [{ from: 1, to: 5 }],
  statuses: {}
};

const ADD_GROUP = 'ADD_GROUP';
const REMOVE_GROUP = 'REMOVE_GROUP';
const UPDATE_GROUP = 'UPDATE_GROUP';
const SET_STATUSES = 'SET_STATUSES';

export const addGroup = (group) => ({
  type: ADD_GROUP,
  group
});

export const removeGroup = (index) => ({
  type: REMOVE_GROUP,
  index
});

export const updateGroup = (index, group) => ({
  type: UPDATE_GROUP,
  index,
  group
});

export const setStatuses = (groupIndex, statuses) => ({
  type: SET_STATUSES,
  groupIndex,
  statuses
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group]
      };
    case REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((_, i) => i !== action.index)
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group, i) =>
          i === action.index ? action.group : group
        )
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.groupIndex]: action.statuses
        }
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);

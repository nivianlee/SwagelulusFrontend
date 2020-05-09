export function reducer(
  state = {
    users: [],
  },
  action
) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.data,
      };
    default:
      return state;
  }
}

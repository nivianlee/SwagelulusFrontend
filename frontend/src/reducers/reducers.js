export function reducer(
  state = {
    users: [],
    restaurantFoodItems: [],
  },
  action
) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.data,
      };
    case 'SET_RESTAURANT_FOOD_ITEMS':
      return {
        ...state,
        restaurantFoodItems: action.data,
      };
    default:
      return state;
  }
}

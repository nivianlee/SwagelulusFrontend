export function reducer(
  state = {
    users: [],
    restaurantFoodItems: [],
    organisations: [],
    restaurants: [],
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
    case 'SET_ORGANISATIONS':
      return {
        ...state,
        organisations: action.data,
      };
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.data,
      };
    default:
      return state;
  }
}

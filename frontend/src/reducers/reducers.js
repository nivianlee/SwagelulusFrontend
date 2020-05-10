export function reducer(
  state = {
    users: [],
    restaurantFoodItems: [],
    organisations: [],
    restaurants: [],
    selectedRestaurantID: '',
    selectedOrganisationID: '',
    orgOrdersPerMonth: [],
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
    case 'SET_SELECTED_RESTAURANT_ID':
      return {
        ...state,
        selectedRestaurantID: action.data,
      };
    case 'SET_SELECTED_ORGANISATION_ID':
      return {
        ...state,
        selectedOrganisationID: action.data,
      };
    case 'SET_ORG_ORDERS_PER_MONTH':
      return {
        ...state,
        orgOrdersPerMonth: action.data,
      };
    default:
      return state;
  }
}

const initialState = {
  text: null,
  streetAdress: null,
  selectedStreet: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADRESS':
      return {
        ...state,
        ...action.payload,
      };

    case 'SET_SELECTED_STREET':
      return {
        ...state,
        selectedStreet: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default mapReducer;

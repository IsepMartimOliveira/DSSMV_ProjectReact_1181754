export const setAdress = payload => ({
  type: 'SET_ADRESS',
  payload,
});
export const setSelectedStreet = (selectedStreet) => ({
  type: 'SET_SELECTED_STREET',
  payload: selectedStreet,
});
export const setDisplay = display => ({
  type: 'SET_DISPLAY',
  payload: display,
});

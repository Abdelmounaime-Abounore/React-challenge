import axios from 'axios';

export const fetchAllData = async () => {
  const response = await axios.get('https://66dd75fcf7bcc0bbdcde2a03.mockapi.io/view');
  return response.data;
};


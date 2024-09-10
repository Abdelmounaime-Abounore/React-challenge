import axios from 'axios';

export const fetchDataById = async (id: string) => {
  const response = await axios.get(`https://66dd75fcf7bcc0bbdcde2a03.mockapi.io/view/${id}`);
  return response.data;
};

export const useToken = () => {
  const token = process.env.TOKEN;
  const headers = {
  'Authorization': `Bearer ${token}`
};
 return headers;
};

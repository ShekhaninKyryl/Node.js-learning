const is401 = (error) => {
  return error.response.status === 401
};
export default is401;

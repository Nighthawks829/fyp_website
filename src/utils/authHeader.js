const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().token}`,
    },
  };
};

export default authHeader;

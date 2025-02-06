/**
 * Generates an authentication header with a Bearer token.
 * 
 * This function retrieves the authentication token from the Redux store using `thunkAPI`
 * and returns an object containing the `Authorization` header.
 * 
 * @param {Object} thunkAPI - The thunkAPI object provided by Redux Toolkit, 
 *                            which includes methods like `getState()`.
 * @returns {Object} An object containing the `Authorization` header with the Bearer token.
 */

const authHeader = (thunkAPI) => {
  return {
    headers: {
      // Retrieve the authentication token from the Redux store
      authorization: `Bearer ${thunkAPI.getState().token}`,
    },
  };
};

export default authHeader;

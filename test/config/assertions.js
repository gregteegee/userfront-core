import { authenticationData, getMfaHeaders } from "../../src/authentication.js";

/**
 * Assert that authenticationData matches the secondFactors
 * and the firstFactorToken
 * @param {Object} response
 */
export function assertAuthenticationDataMatches(response) {
  // secondFactors
  expect(authenticationData.secondFactors).toEqual(
    response.data.authentication.secondFactors
  );
  // firstFactorToken
  expect(authenticationData.firstFactorToken).toEqual(
    response.data.firstFactorToken
  );
}

export function assertNoUser(user) {
  const userFields = Object.values(user).filter(
    (val) => typeof val !== "function"
  );
  expect(userFields).toEqual([]);
}

export const mfaHeaders = expect.objectContaining({
  headers: {
    authorization: expect.stringMatching(/^Bearer uf_test_first_factor/),
  },
});
export const noMfaHeaders = expect.not.objectContaining({
  headers: {
    authorization: expect.stringMatching(/^Bearer uf_test_first_factor/),
  },
});

export const withMfaHeaders = (options = {}) => {
  return {
    ...options,
    headers: getMfaHeaders(),
  };
};

export const withoutMfaHeaders = (options) => {
  if (!options) {
    return noMfaHeaders;
  }
  return options;
};

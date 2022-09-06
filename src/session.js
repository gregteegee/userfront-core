import {
  isAccessTokenLocallyValid,
  isRefreshTokenLocallyValid,
} from "./tokens.js";
import { refresh } from "./refresh.js";

/**
 * Determine whether a user is logged in by checking their
 * JWT access token and, if invalid, refreshing it and checking
 * again.
 * @returns {Promise<Boolean>}
 */
async function getIsLoggedIn() {
  try {
    // If the access token is locally valid, return true
    if (isAccessTokenLocallyValid()) {
      return true;
    }

    // If the refresh token is locally invalid, return false
    if (!isRefreshTokenLocallyValid()) {
      return false;
    }

    // Attempt to refresh the access token
    await refresh();

    // The access token should now be valid
    return isAccessTokenLocallyValid();
  } catch (error) {
    return false;
  }
}

/**
 * Return detailed information about the current session.
 * @returns {Promise<Boolean>}
 */
export async function getSession() {
  const isLoggedIn = await getIsLoggedIn();
  return { isLoggedIn };
}

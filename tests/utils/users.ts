import {getEnvData} from "./env";

/**
 * Return user data.
 *
 * @param user
 * @returns {any}
 */
export function getUserData(user: string) {
  return getEnvData('user')[user] || {};
}
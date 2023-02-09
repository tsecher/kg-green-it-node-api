/**
 * @file
 *
 * Several tools for preparing the test context.
 */
import {APIManager} from '../../src/services/APIManager';

import {getEnvData} from "./env";

/**
 * Prepare API Manager.
 */
export function prepareApiManager() {
  APIManager.setApiBaseUrl(getEnvData('API_URL'));
}
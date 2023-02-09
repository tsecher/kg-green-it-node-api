/**
 * @file
 *
 * Provide tools for interaction with environments.
 */
const fs = require('fs');
const path = require('path');

const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

// Init args.
const params: any = yargs(hideBin(process.argv)).argv;

// Init env file.
const envFile = path.resolve(process.cwd(), 'env.json');
const envData = fs.existsSync(envFile) ? require(envFile) : {};

export const env = {
  ...process.env,
  ...envData,
  ...params,
};

/**
 * Return the env value for property key.
 *
 * @param {string} key
 * @returns {any}
 */
export function getEnvData(key: string) {
  return env[key];
}
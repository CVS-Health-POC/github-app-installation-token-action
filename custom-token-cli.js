/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-commonjs */

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

if (
  process.env.APP_ID &&
  process.env.INSTALLATION_ID &&
  process.env.PRIVATE_KEY_PATH
) {
  const privateKeyPath = path.resolve(process.env.PRIVATE_KEY_PATH);
  const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
  const token = {
    appId: process.env.APP_ID,
    installationId: process.env.INSTALLATION_ID,
    privateKey,
  };
  console.log(Buffer.from(JSON.stringify(token)).toString('base64'));
} else {
  console.error(
    new Error(
      'Environment variables APP_ID, INSTALLATION_ID and PRIVATE_KEY_PATH are required to be set.',
    ),
  );
}

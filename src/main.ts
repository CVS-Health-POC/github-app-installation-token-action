import * as core from '@actions/core';
import { createAppAuth } from '@octokit/auth-app';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    const auth = createAppAuth({
      appId: +payload.appId,
      privateKey: payload.privateKey,
      installationId: +payload.installationId,
    });
    const installationToken = (await auth({ type: 'installation' })).token;
    core.setSecret(installationToken);
    core.setOutput('installation-token', installationToken);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();

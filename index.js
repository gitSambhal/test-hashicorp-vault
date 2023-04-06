const axios = require('axios');
const VaultClient = require('node-vault-client');

const VAULT_URL = 'http://127.0.0.1:8200/';
const VAULT_TOKEN = 'myroot';
const VAULT_SECRET_PATH = 'secret/data/integration-dev';

async function fetchSecretFromVaultUsingAPI() {
  try {
    const { data } = await axios.get(`${VAULT_URL}v1/${VAULT_SECRET_PATH}`, {
      headers: { 'X-Vault-Token': VAULT_TOKEN },
    });
    console.log('🚀 ~ file: index.js:9 ~ response:', data.data);
  } catch (error) {
    console.error('Got error fetching the secret from Vault using API', error);
  }
}

async function fetchSecretFromVault() {
  try {
    const vaultClient = VaultClient.boot('', {
      api: { url: VAULT_URL, apiVersion: 'v1' },
      auth: { type: 'token', config: { token: VAULT_TOKEN, logger: false } },
      logger: false,
    });

    const value = await vaultClient.read(VAULT_SECRET_PATH);
    console.log('🚀 ~ file: index.js:14 ~ vaultClient.read ~ value:', value);
  } catch (error) {
    console.error('Got error fetching the secret from Vault', error);
  }
}

// fetchSecretFromVaultUsingAPI();
// fetchSecretFromVault();

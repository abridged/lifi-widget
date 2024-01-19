import { EthereumBalanceRequest } from '../../components/ChainCard/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserProfile(accessToken: string) {
  const res = await fetch(`${apiUrl}/account/me`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch user profile');
  }
  const data = await res.json();
  return data;
}

export async function getUserSmartAccount(accessToken: string) {
  const res = await fetch(`${apiUrl}/telefrens/me/account`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch user profile');
  }
  const data = await res.json();
  return data;
}

export async function getBalance(
  accessToken: string,
  request: EthereumBalanceRequest,
) {
  const res = await fetch(`${apiUrl}/ethereum/asset-balances`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch user balance');
  }
  const data = await res.json();
  return data;
}

export async function transferFund(accessToken: string) {
  const res = await fetch(`${apiUrl}/telefrens/me/fund-account`, {
    method: 'post',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch user profile');
  }
  const data = await res.json();
  return data;
}

export async function submitTxWaitJob(
  accessToken: string,
  txObj: {
    txHash: string;
    fromChain: string;
    bridge?: string;
    toChain?: string;
  },
) {
  const res = await fetch(`${apiUrl}/telefrens/lifi-widget/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json,',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(txObj),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to submit tx wait job');
  }
}

export async function waitForTx(
  accessToken: string,
  txObj: {
    chainId: string;
    txHash: string;
  },
) {
  const res = await fetch(`${apiUrl}/telefrens/lifi-widget/wait-tx`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json,',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(txObj),
  });

  if (!res.ok) {
    throw new Error('Failed to wait for tx');
  }
  const data = await res.json();
  return data;
}

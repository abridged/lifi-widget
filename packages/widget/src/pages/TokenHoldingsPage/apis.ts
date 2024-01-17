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

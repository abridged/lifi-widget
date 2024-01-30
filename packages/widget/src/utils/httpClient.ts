let defaultHeaders: Record<string, any> = {};

export default async function httpClient(
  url: string,
  options: RequestInit = {},
  baseUrl?: string,
  accessTokenNotAllowed?: boolean,
) {
  if (!accessTokenNotAllowed) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw Error('No access token');
    }
    options.headers = {
      ...defaultHeaders,
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
  }
  const response = await fetch(
    `${baseUrl ?? process.env.NEXT_PUBLIC_API_URL}/${url}`,
    options,
  );
  const isBodyEmpty = response.status === 204;

  if (isBodyEmpty) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  if (!contentType || !contentType.includes('application/json')) {
    return response;
  }

  const payload = await response.json();
  const unauthorized = 401;

  if (
    response.status === unauthorized ||
    payload?.error?.statusCode === unauthorized
  ) {
    const error = new ApiError('Session expired');

    error.statusCode = unauthorized;

    throw error;
  }

  if (payload?.error) {
    let message =
      payload.error.message ||
      payload.error.name ||
      payload.error.code ||
      payload.error;
    const isString = typeof message === 'string' || message instanceof String;

    if (!isString) {
      message = 'Invalid operation';
    }

    if (Array.isArray(payload.error.details)) {
      message = payload.error.details.map((err: any) => err.message).join('\n');
    }

    const error = new ApiError(message);

    error.statusCode = payload.error.statusCode;

    throw error;
  }

  return payload;
}

class ApiError extends Error {
  statusCode?: number;
}

httpClient.setDefaultHeaders = function (headers: Record<string, any>) {
  defaultHeaders = {
    ...defaultHeaders,
    ...headers,
  };
};

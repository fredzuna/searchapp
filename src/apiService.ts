const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiRequest = async (endpoint: string, method: string, body?: any) => {
  const url = `${BASE_URL}${endpoint}&api_key=${API_KEY}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const get = (endpoint: string) => {
  return apiRequest(endpoint, 'GET');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = (endpoint: string, body: any) => {
  return apiRequest(endpoint, 'POST', body);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = (endpoint: string, body: any) => {
  return apiRequest(endpoint, 'PUT', body);
};
const apiUrl = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`

export class BaseApiService {
  constructor() {
    this.apiUrl = apiUrl;
  }

  async apiRequest(url, method = 'GET', body = null) {
    try {
      const response = await fetch(`${this.apiUrl}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'API request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error.message || 'An error occurred' };
    }
  }
}
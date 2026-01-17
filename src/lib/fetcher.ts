import { retrieveRawInitData } from '@tma.js/sdk-svelte';

type RequestParams<B> = {
  path: string;
  body: B;
  headers?: Record<string, string>;
};

class Fetcher {
  private baseUrl: string;
  private tgHash: string | undefined;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    this.tgHash = retrieveRawInitData();
  }

  private get defaultHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.tgHash ? { 'X-TG-HASH': this.tgHash } : {})
    };
  }

  async get<R>({ path, headers }: RequestParams<void>): Promise<R> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...headers }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  async post<R, B>({ path, body, headers }: RequestParams<B>): Promise<R> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { ...this.defaultHeaders, ...headers },
      body: JSON.stringify(body)
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }
}

export const fetcher = new Fetcher();

export async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }
  
  export function handleApiError(error: unknown): { message: string; status: number } {
    if (error instanceof Error) {
      return { message: error.message, status: 500 };
    }
    return { message: 'An unknown error occurred', status: 500 };
  }
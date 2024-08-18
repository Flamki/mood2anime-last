export function setCachedData<T>(key: string, data: T, expirationInMinutes: number): void {
    const expirationMs = expirationInMinutes * 60 * 1000;
    const item = {
      value: data,
      expiration: Date.now() + expirationMs,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }
  
  export function getCachedData<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
  
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }
  
    return item.value;
  }
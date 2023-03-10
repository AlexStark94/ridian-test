import { useEffect, useState } from 'react';

/**
 * Similar to useState but first state (initialState) is stored in localStorage.
 * @param {string} key - The key to store the value under
 * @param {T} initialValue - The initial value to store
 * @see https://usehooks.com/useLocalStorage/
 */
export function useLocalStorage<T>(key: string, initialValue: T, mode: 'ssr' | 'csr' = 'csr') {
  const [storedValue, setStoredValue] = useState<T>(() =>
    mode === 'csr' ? getItemFromLocalStorage(key, initialValue) : initialValue,
  );

  useEffect(() => {
    setStoredValue((value) => getItemFromLocalStorage(key, value));
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export function getItemFromLocalStorage<T>(key: string, defaultValue?: T) {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

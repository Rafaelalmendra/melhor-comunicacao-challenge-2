'use client';

import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const getStoredValue = () => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue != null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error getting data from localStorage: ', error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting data to localStorage :', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };

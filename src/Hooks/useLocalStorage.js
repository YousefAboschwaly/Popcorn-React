import { useEffect, useState } from "react";

export default function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(function () {
    const storedWatched = localStorage.getItem(key);
    return storedWatched ? JSON.parse(storedWatched) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

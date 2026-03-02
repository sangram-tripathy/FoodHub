import React, { useEffect, useState, useCallback } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Something went wrong, failed to send request.');
  }

  return resData;
}

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData(){
    setData(initialData)
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
    if (!url) return;
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, {...config, body: data});
      setData(resData);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if (url && ((config && (config.method === 'GET' || !config.method)) || !config )){
      sendRequest();
    }
  }, [sendRequest, config, url]);

  return { data, isLoading, error, sendRequest ,clearData};
};

export default useHttp;

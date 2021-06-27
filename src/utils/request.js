import isEmpty from './isEmpty';

const request = async (url, data, opts = {}) => {
  const options = {
    method: opts.method || 'GET',
    credentials: opts.credentials || 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  };

  if (!isEmpty(data)) {
    if (options.method ===  'GET') {
      url += `?${new URLSearchParams(data).toString()}`
    } else {
      options.body = JSON.stringify(data);
    }
  }
  

  const response = await fetch(url, options);
  const json = await response.json();
  return response.ok ? json : Promise.reject(json);
};

export default request;

import axios from 'axios';

const Http = options => axios({
  method: options.method || 'get',
  url: `${options.url}`,
  params: options.params,
});

export default Http;

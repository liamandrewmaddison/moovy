import axios from 'axios';
import config from '@/config/api';

/* --------------------------------*
 * UTILS/HTTP.JS
 *
 * Our axios wrapper so that we can
 * keep our code dry and only
 * pass what's necessary at all times
 *--------------------------------*/
const Http = options => axios({
  method: options.method || 'get',
  url: `https://api.themoviedb.org/3/${options.url}`,
  params: {
    ...options.params,
    api_key: config.key,
    language: 'en-US',
  },
});

export default Http;

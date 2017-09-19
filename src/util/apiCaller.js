import PubSub from 'pubsub-js';
import { showAlert, errorHandler } from './message';

export const API_URL = 'http://localhost:8080';

export default function callApi(endpoint, method = 'get', body) {

  PubSub.publish('show-loading', true);

  console.log('chamou aqui', `${API_URL}/${endpoint}`);
  
  
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 
      'content-type': 'application/json',
      'X-User-Token': 'MUA2OTYxNzMxODk5NDQ3OTI5NzE1OTQ0MTcwNTQwOTI0NTE2NzkyMTM0NDQyOTEyNjcxNzUyODIzNzU5NzU0MjA4MjIwMzI5NTM5ODA4MTYyNTE2MDMwNzUwNzQ5NjkwODEzMjkzMTE5MjY2MjE5NDQyMTMwMTM4MTA4MzUwNjg0Njk0NDgxNTY0MzI4Mzg4NDYwMjY1Njg5NDEzNzM5Mzk4MTg1MjMzMDkzNjY2MDAwNDkyNjY2OTE5MzAyM0AxNDk2ODY1NjIxOTAz'
    },
    method,
    body: JSON.stringify(body),
    credentials: 'include'
  }).then((response) => {

    PubSub.publish('show-loading', false);

    return response.json().then((json) => ({ json, response }));
  }).then(({ json, response }) => {

    if (!response.ok) {
      showAlert('error', 'Error', json.message);
      return Promise.reject(json);
    } else {
      showAlert('success', 'Success', json.message);
    }

    return json;
  }).catch((error) => {
    console.log('response', error);
    PubSub.publish('show-loading', false);
    showAlert('error', `Error: ${error}`, 'Contact your system administrator');
  });
}
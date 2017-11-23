import PubSub from 'pubsub-js';
import { showAlert, errorHandler } from './message';

export const API_URL = 'http://localhost:4000';

export default function callApi(endpoint, method = 'get', body) {

  PubSub.publish('show-loading', true);

  console.log('chamou aqui', `${API_URL}/${endpoint}`);
  
  
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 
      'content-type': 'application/json'
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
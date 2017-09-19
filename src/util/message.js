import PubSub from 'pubsub-js';

export function showAlert(type, title, message, position = 'tr') {
  PubSub.publish('alert', {
    type,
    title,
    message,
    position
  });
}

export function errorHandler(errors) {
  errors.errors.forEach((erro) => {
    PubSub.publish("error-validation", erro);
  });
}

export function flattenMessages(nestedMessages, prefix = '') {

  return Object.keys(nestedMessages).reduce((messages, key) => {

    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if(typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});

}
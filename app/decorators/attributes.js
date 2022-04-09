import { attr } from '@ember-data/model';

export function number(options) {
  return function (target, name, descriptor) {
    target.constructor.knownProperties =
      target.constructor.knownProperties || {};
    target.constructor.knownProperties[name] = 'number';
    return attr('number', options)(target, name, descriptor);
  };
}

export function boolean(options) {
  return function (target, name, descriptor) {
    target.constructor.knownProperties =
      target.constructor.knownProperties || {};
    target.constructor.knownProperties[name] = 'boolean';
    return attr('boolean', options)(target, name, descriptor);
  };
}

export function string(options) {
  return function (target, name, descriptor) {
    target.constructor.knownProperties =
      target.constructor.knownProperties || {};
    target.constructor.knownProperties[name] = 'string';
    return attr('string', options)(target, name, descriptor);
  };
}

export function text(options) {
  return function (target, name, descriptor) {
    target.constructor.knownProperties =
      target.constructor.knownProperties || {};
    target.constructor.knownProperties[name] = 'text';
    return attr('string', options)(target, name, descriptor);
  };
}

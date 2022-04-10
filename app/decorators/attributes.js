import { attr } from '@ember-data/model';

function knownProperties(target) {
  target.constructor.knownProperties =
    target.constructor.knownProperties || {};
}

function propertyMeta(target) {
  target.constructor.propertyMeta =
    target.constructor.propertyMeta || {};
}

function setInfo(target, property, kind, options = {}) {
  knownProperties(target)[property] = kind;
  propertyMeta(target)[property] = options;
}

export function number(options) {
  return function (target, name, descriptor) {
    setInfo(target, name, 'number');
    return attr('number', options)(target, name, descriptor);
  };
}

export function boolean(options) {
  return function (target, name, descriptor) {
    setInfo(target, name, 'boolean');
    return attr('boolean', options)(target, name, descriptor);
  };
}

export function string(options) {
  return function (target, name, descriptor) {
    setInfo(target, name, 'string');
    return attr('string', options)(target, name, descriptor);
  };
}

export function text(options) {
  return function (target, name, descriptor) {
    setInfo(target, name, 'text');
    return attr('string', options)(target, name, descriptor);
  };
}

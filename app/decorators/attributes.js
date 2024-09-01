import {
  attr,
  belongsTo as modelBelongsTo,
  hasMany as modelHasMany,
} from '@ember-data/model';

function knownProperties(target) {
  target.constructor.knownProperties = target.constructor.knownProperties || {};
  return target.constructor.knownProperties;
}

function propertyMeta(target) {
  target.constructor.propertyMeta = target.constructor.propertyMeta || {};
  return target.constructor.propertyMeta;
}

function setInfo(target, property, kind, options = {}) {
  knownProperties(target)[property] = kind;
  propertyMeta(target)[property] = options;
}

/**
 * Moves the value of source[key] into target[key], removing the key
 * from source.
 *
 * @param {string} key The key to extract.
 * @param {object} source The object to extract the key from.
 * @param {object} target The object to move the key into.
 */
function moveValueTo(key, source, target) {
  target[key] = source[key];
  delete source[key];
}

function extractMeta(sourceOptions) {
  if (sourceOptions) {
    // don't override existing options object
    let options = Object.assign({}, sourceOptions);
    let meta = {};

    // extract interesting properties
    moveValueTo('show', options, meta);
    moveValueTo('edit', options, meta);

    return [options, meta];
  } else {
    return [sourceOptions, {}];
  }
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

export function date(options) {
  return function (target, name, descriptor) {
    setInfo(target, name, 'date', { show: "rendering/show/date" });
    return attr('date', options)(target, name, descriptor);
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

export function belongsTo(klass, options) {
  let meta;
  [options, meta] = extractMeta(options);

  return function (target, name, descriptor) {
    setInfo(target, name, 'belongsTo', meta);
    return modelBelongsTo(klass, options)(target, name, descriptor);
  };
}

export function hasMany(klass, options) {
  let meta;
  [options, meta] = extractMeta(options);

  return function (target, name, descriptor) {
    setInfo(target, name, 'hasMany', meta);
    return modelHasMany(klass, options)(target, name, descriptor);
  };
}

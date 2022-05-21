import { dasherize, camelize } from '@ember/string';
import humanize from '../utils/humanize';
import { pluralize } from 'ember-inflector';

export default function link(options = {}) {
  return function (constructor) {
    const dashedName = dasherize(constructor.name).replace(
      /^(.*)-[^-]+/,
      (_match, part) => part
    );
    // converts ProductGroupModel into product-groups
    const defaultBasePathName = pluralize(dashedName);

    const basePath = options.basePath || defaultBasePathName;

    constructor.linkOptions = {
      show: options.show || `${basePath}.show`,
      edit: options.edit || `${basePath}.edit`,
      list: options.list || `${basePath}.index`,
      new: options.new || `${basePath}.new`,
      listLabel: options.listLabel || humanize(camelize(basePath)),
      newLabel: options.newLabel || `${humanize(camelize(dashedName))}`,
      label: options.label || 'label',
    };

    return constructor;
  };
}

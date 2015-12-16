import * as _ from 'lodash';

export function concatObjectArrays(obj: any) {
  return _(obj)
    .omit(v => !_.isArray(v))
    .values()
    .reduce((pre, cur) => pre.concat(cur), []);
}

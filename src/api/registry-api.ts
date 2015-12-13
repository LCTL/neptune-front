import * as _ from 'lodash';
import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildPath(options): string {
  return `${apiBaseUrl}/registry/${options.registry.name}/${options.registry.version}`;
}

function defaultOptions(options?: Options) {
  return _.defaultsDeep(options, {
    registry: {
      name: 'central',
      version: 'v1'
    }
  });
}

export default {
  searchImages: function (options?: Options): Promise<Response> {
    const opt:any = defaultOptions(options);
    return end(request.get(`${buildPath(opt)}/search`).query(_.omit(options, 'registry')));
  }
}

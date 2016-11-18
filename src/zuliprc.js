import readFile from 'fs-readfile-promise';
import { parse } from 'ini';

function parseConfigFile(filename) {
  return readFile(filename)
    .then(buf => buf.toString())
    .then(parse)
    .then((parsedConfig) => {
      const config = {
        realm: parsedConfig.api.site,
        username: parsedConfig.api.username,
        apiKey: parsedConfig.api.key,
      };
      return config;
    });
}

export default parseConfigFile;

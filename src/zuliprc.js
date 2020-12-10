import readFile from 'fs-readfile-promise';
import { parse } from 'ini';

async function parseConfigFile(filename) {
  const buf = await readFile(filename);
  const parsedConfig = parse(buf.toString());
  const config = {
    realm: parsedConfig.api.site,
    username: parsedConfig.api.email,
    apiKey: parsedConfig.api.key,
  };
  config.apiURL = `${parsedConfig.api.site}/api/v1`;
  return config;
}

export default parseConfigFile;

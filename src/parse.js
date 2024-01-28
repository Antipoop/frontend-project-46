import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

const getExtension = (filename) => path.extname(filename);

const getData = (filepath, extension) => {
  const absolutePath = getAbsolutePath(filepath);
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(fs.readFileSync(absolutePath));
  }
  return JSON.parse(fs.readFileSync(absolutePath));
};

const parse = (filename) => {
  const extension = getExtension(filename);
  return getData(filename, extension);
};

export { parse };

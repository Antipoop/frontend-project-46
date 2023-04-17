import path from 'path';
import getGenDiff from './getGendiffJson.js';

const extname = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  if (extname(filepath1) === '.json' && extname(filepath2) === '.json') {
    getGenDiff(filepath1, filepath2);
  }
};

export default genDiff;

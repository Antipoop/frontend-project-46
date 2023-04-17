import path from 'path';
import fs from 'fs';
import process from 'process';
import _ from 'lodash';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath2)));
  if (path.extname(filepath1) === '.json' && path.extname(filepath2) === '.json') {
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const all = _.sortBy(_.union(keys1, keys2));
    const result = all.reduce((acc, currentValue) => {
      let difference = acc;
      if (!Object.hasOwn(file2, currentValue)) {
        difference += ` - ${currentValue}: ${file1[currentValue]}\n`;
      } else if (!Object.hasOwn(file1, currentValue)) {
        difference += ` + ${currentValue}: ${file2[currentValue]}\n`;
      } else if (file1[currentValue] !== file2[currentValue]) {
        difference += ` - ${currentValue}: ${file1[currentValue]}\n`;
        difference += ` + ${currentValue}: ${file2[currentValue]}\n`;
      } else {
        difference += `   ${currentValue}: ${file1[currentValue]}\n`;
      }
      return difference;
    }, '');
    console.log(`{\n${result}}`);
  }
};

export default genDiff;

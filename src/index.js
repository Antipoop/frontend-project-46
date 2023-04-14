import path from 'path';
import fs from 'fs';
import process from 'process';
import _ from 'lodash';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath1)));
  const file2 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath2)));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const all = _.sortBy(_.union(keys1, keys2));
  const iter = (arr1, arr2) => {
    let result = '{\n';
    all.map((key) => {
      if (arr1.includes(key) && arr2.includes(key)) {
        if (file1[key] === file2[key]) {
          result += `   ${key}: ${file1[key]} \n`;
        } else {
          result += ` - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}\n`;
        }
      } else if (arr1.includes(key)) {
        result += ` - ${key}: ${file1[key]}\n`;
      } else if (arr2.includes(key)) {
        result += ` + ${key}: ${file2[key]}\n`;
      }
      return result;
    });
    result += '}';
    return result;
  };
  console.log(iter(keys1, keys2));
};

export default genDiff;

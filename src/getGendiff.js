import _ from 'lodash';
import parse from './parse.js';

const getSortedUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  return unionKeys;
};

const minusOrPlus = (data1, data2, key) => {
  let result = '';
  if (key in data1 && key in data2 === false) {
    result = ` - ${key}: ${data1[key]}`;
  }
  if (key in data2 && key in data1 === false) {
    result = ` + ${key}: ${data2[key]}`;
  }
  if (data1[key] && data2[key]) {
    if (data1[key] !== data2[key]) {
      result = ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`;
    } else {
      result = `   ${key}: ${data1[key]}`;
    }
  }
  return result;
};

const getGenDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const unionKeys = getSortedUnionKeys(data1, data2);
  const result = unionKeys.reduce((acc, curval) => `${acc}\n${minusOrPlus(data1, data2, curval)}`, '');
  return `{${result}\n}`;
};

export default getGenDiff;

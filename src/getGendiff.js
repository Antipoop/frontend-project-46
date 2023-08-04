import _ from 'lodash';
import parse from './parse.js'

const getSortedUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  return unionKeys;
};

const getGenDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const unionKeys = getSortedUnionKeys(data1, data2);
  const result = unionKeys.reduce((acc, currentValue) => {
    let difference = acc;
    if (!Object.hasOwn(data2, currentValue)) {
      difference += ` - ${currentValue}: ${data1[currentValue]}\n`;
    } else if (!Object.hasOwn(data1, currentValue)) {
      difference += ` + ${currentValue}: ${data2[currentValue]}\n`;
    } else if (data1[currentValue] !== data2[currentValue]) {
      difference += ` - ${currentValue}: ${data1[currentValue]}\n`;
      difference += ` + ${currentValue}: ${data2[currentValue]}\n`;
    } else {
      difference += `   ${currentValue}: ${data1[currentValue]}\n`;
    }
    return difference;
  }, '');
  return `{\n${result}}`;
};

export default getGenDiff;

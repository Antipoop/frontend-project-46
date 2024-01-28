import { getGenDiff, getSortedUnionKeys } from "../src/getGendiff";

const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

test('diff', () => {
    expect(getGenDiff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json')).toEqual(result);
});
const data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false
  };
const data2 = { timeout: 20, verbose: true, host: 'hexlet.io' };
const result2 = [ 'follow', 'host', 'proxy', 'timeout', 'verbose' ]
// test('getSortedUnionKeys', () => {
//    expect(getSortedUnionKeys(data1, data2)).toEqual(result2)
// })
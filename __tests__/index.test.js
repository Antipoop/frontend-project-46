import genDiff from '../src/index.js';

const result = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
test('diff json', () => {
  expect(genDiff('__fixtures__/testFile1.json', '__fixtures__/testFile2.json')).toEqual(result);
});
test('diff yml', () => {
  expect(genDiff('__fixtures__/testFile1.yml', '__fixtures__/testFile2.yml')).toEqual(result)
});

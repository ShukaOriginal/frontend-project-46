import fs from 'fs';
import path from 'path';

export default (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(path1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(path2)));
  console.log(compareObjs(obj1, obj2));
};

const compareObjs = (obj1, obj2) => {
  const unionObj = { ...obj1, ...obj2 };
  const unionObjKeysSorted = Object.keys(unionObj).sort();

  const objDiff = unionObjKeysSorted.reduce((acc, key) => {
    const obj1HasKey = Object.hasOwn(obj1, key);
    const obj2HasKey = Object.hasOwn(obj2, key);

    if (obj1HasKey && obj2HasKey) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `    ${key}: ${obj1[key]}`];
      }
      return [...acc, `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`];
    }
    if (obj1HasKey && !obj2HasKey) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (!obj1HasKey && obj2HasKey) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
  }, []);

  return `{\n${objDiff.join('\n')}\n}`;
};

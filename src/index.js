import path from 'path';
import fs from 'fs';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename)

const genDiff = (filepath1, filepath2) => {
const data1 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath1)))
const data2 = JSON.parse(fs.readFileSync(getAbsolutePath(filepath2))) 
const keys2 = Object.entries(data2)
const keys1 = Object.entries(data1).sort()
console.log('{')
keys1.map((el) => {
    if (data2[el[0]] !== undefined) {
        if (data1[el[0]] === data2[el[0]]) {
            const key = el[0];
            const value = data1[el[0]]
            console.log(`   ${key}: ${value}`)
        }
    }
    if (data2[el[0]] === undefined){
        console.log(` - ${el[0]}: ${data1[el[0]]}`)
    }
    if (data1[el[0]] !== data2[el[0]] && !!data2[el[0]]){
        console.log(` - ${el[0]}: ${data1[el[0]]}
 + ${el[0]}: ${data2[el[0]]}`)
    }
}
)
keys2.map((el) => {
    if (data1[el[0]] === undefined) {
        console.log(` + ${el[0]}: ${data2[el[0]]}`)
    }
})
console.log('}')
}

export { genDiff }

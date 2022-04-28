var arr = [1, 2, 2, 3];
var testArr = [1, 1];
/**
 * 统计每个数字出现的次数
 * @param {*} arr arr 所有整数范围都在[1, 3]
 */
var countArray1 = function(arr) {
  const maxLen = Math.max.apply(null, arr);
  let countArr = new Array(maxLen).fill(0);
  for (let item of arr) {
    let index = item - 1;
    countArr[index]++;
  }
  return countArr;
}

const res1 = countArray1(arr);
const res2 = countArray1(testArr);
console.log(res1); // [ 1, 2, 1 ]
console.log(res2);
// max()里面参数不能为数组，借助apply(funtion,args)方法调用Math.max()，当function为null时，默认为上文,即相当于apply(Math.max,arr)

var countArray2 = function(arr) {
  let countMap = new Map();
  for (let item of arr) {
    if (countMap.has(item)) {
      let count = countMap.get(item);
      countMap.set(item, count + 1);
    } else {
      countMap.set(item, 1)
    }
  }
  return countMap;
}
// const res2 = countArray2(arr);
// console.log(res2); // { 1 => 1, 2 => 2, 3 => 1 }
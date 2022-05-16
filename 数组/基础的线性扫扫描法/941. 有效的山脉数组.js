/*
  线性扫描
  思路：
    先根据 arr[i] < arr[i + 1] 找到最高点 i， 再根据 arr[i] > arr[i + 1]从最高点往后递减扫描，如果此时的 i  指向数组最后一个元素，则返回 true,否则返回 false
  注意：判断最高点不能是第一个元素和最后一个元素！！
*/
var validMountainArray = function(arr) {
  let i = 0; // 遍历指针
  const n = arr.length;
  while (i < n && arr[i] < arr[i + 1]) i++; // 找最高点
  if (i == 0 || i == n - 1) return false; // 最高点不能是第一个和最后一个元素
  while (i < n && arr[i] > arr[i + 1]) i++; // 从最高点往后递减扫描

  return i === n - 1;
};
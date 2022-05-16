var rotate = function(nums, k) {
  // 方法一：开辟额外新数组
  const newArr = new Array();
  for(let i = 0; i < nums.length; i++) {
    let index = (i + k) % nums.length;
    newArr[index] = nums[i];
  }
  for(let i = 0; i < nums.length; i++) {
    nums[i] = newArr[i];
  }
  return nums;
};
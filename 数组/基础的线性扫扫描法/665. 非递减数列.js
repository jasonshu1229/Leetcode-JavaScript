var checkPossibility = function(nums) {
  let cnt = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      cnt++; // 只能修改一次
      if (cnt > 1) return false;
      if (i - 2 >= 0 && nums[i] < nums[i - 2]) {
        nums[i] = nums[i - 1]; // 因为此时 nums[i - 1] 一定大于 nums[i - 2] 前面是非递减数列
      } else {
        nums[i - 1] = nums[i];
      }
    }
  }
  return true;
};
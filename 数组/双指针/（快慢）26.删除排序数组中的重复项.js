/*
  给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，
  返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。
*/

/*
  输入：nums = [0,0,1,1,1,2,2,3,3,4]
  输出：5, nums = [0,1,2,3,4]
  解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
*/
var removeDuplicates = function (nums) {
  // 快慢指针
  if (nums.length == 0) return 0;

  let slow = 0, fast = 1;
  while(fast < nums.length) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
    fast++
  }

  return slow + 1;
};

const result = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
console.log(result); // 5

/*
  解题思路：
  解法： 双指针

  首先注意数组是有序的，那么重复的元素一定会相邻。

  要求删除重复元素，实际上就是将不重复的元素移到数组的左侧。

  考虑用 2 个指针，一个在前记作 p，一个在后记作 q，算法流程如下：

  1.比较 p 和 q 位置的元素是否相等。

  如果相等，q 后移 1 位
  如果不相等，将 q 位置的元素复制到 p+1 位置上，p 后移一位，q 后移 1 位
  重复上述过程，直到 q 等于数组长度。

  返回 p + 1，即为新数组长度。
  ![](https://tva1.sinaimg.cn/large/007S8ZIlly1ghn276azecj30fk0rbjt5.jpg)
*/

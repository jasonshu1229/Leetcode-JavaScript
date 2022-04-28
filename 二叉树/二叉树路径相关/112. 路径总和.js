/*
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。
*/

/**
 * 判断是否存在路径和等于目标target
 * @param {*} root 
 * @param {*} target 
 */
/*
  思路1：先穷举从根节点到叶子节点的所有路径和，再判断是否存在目标和
*/
var hasPathSum = function(root, targetSum) {
  let res = [], path = [];
  // 1. 获取所有路径
  const dfs = (node, path, res) => {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right) {
      // 添加路径的时候需要 new 一个新的 ArrayList 的原因：
      // 1. 使得 res 中的对象和 path 不是同一个对象
      res.push(new Array().concat(path));
    }
    dfs(node.left, path, res);
    dfs(node.right, path, res);
    path.pop(); // 回溯的过程中，将当前的节点从 path 中删除
  }
  dfs(root, path, res);
  // 2. 验证路径和是否存在targetSum
  for (let i = 0; i < res.length; i++) {
    let sum = 0;
    for (let j = 0; j < res[i].length; j++) {
      sum += res[i][j];
    }
    if (sum === targetSum) return true;
  }
  return false;
};

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
/*
  思路2：找出每个路径上的节点和，放进一个数组，再判断是否存在目标和
*/
var hasPathSum = function(root, targetSum) {
  if (!root) return 0;
  let res = []; // 存储每条路径的节点和
  const dfs = (node, parentNodePathSum, res) => {
    if (!node) return;
    let curNodePathSum = parentNodePathSum + node.val;
    if (!node.left &&!node.right) {
      res.push(curNodePathSum);
    }
    dfs(node.left, curNodePathSum, res);
    dfs(node.right, curNodePathSum, res);
  };
  dfs(root, 0, res); // 根节点没有父亲节点路径和

  for (let i = 0; i < res.length; i++) {
    if (res[i] === targetSum) return true;
  }
  return false;
};

/*
  思路：从上到下遍历，用curNodeTarget = targetSum - 当前节点的值，如果遇到叶子节点，且curNodeTarget为0，则说明存在，直接返回true。否则就递归地去左子树寻找路径和或者右子树里存在路径和的节点，两个里有一个就可以返回 true。（目标和相减，减到当前节点的值为0）
  注意：curNodeTarget = parentNodeTarget - node.val
*/
var hasPathSum = function(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) {
      return targetSum - root.val == 0
  }
  // 去左右子树里寻找存在路径和的节点
  const leftHasPathSum = hasPathSum(root.left, targetSum - root.val);
  // 找到的话提前退出
  if (leftHasPathSum) return true;

  const rightHasPathSum = hasPathSum(root.right, targetSum - root.val);

  return leftHasPathSum || rightHasPathSum;
};
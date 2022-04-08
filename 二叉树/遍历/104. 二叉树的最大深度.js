/*
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** BFS迭代
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  // BFS
  if (!root) return 0;
  const queue = [];
  queue.push(root);
  let levels = 0; // 定义有多少层
  while (queue.length) {
    const size = queue.length; // 记住当前层有多少个节点
    // 循环遍历每一层节点进行处理(for循环每次执行完，都代表当前层遍历完毕)
    for (let i = 0; i < size; i++) { 
      const cur = queue.shift();
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    levels++;
  }
  return levels;
};

// DFS 迭代
var maxDepth = function(root) {
  // DFS：获取每个节点的高度，取最大的高度
  if (!root) return 0;
  const stack = [];
  stack.push([root, 1]);
  let heiRes = 0;
  while (stack.length) {
    const cur = stack.pop();
    const curNode = cur[0], curLevel = cur[1];
    // 遍历每个节点时，取它们的最大高度
    heiRes = Math.max(heiRes, curLevel);
    if (curNode.right) stack.push([curNode.right, curLevel + 1]);
    if (curNode.left) stack.push([curNode.left, curLevel + 1]);
  }
  return heiRes;
}

// DFS 前序遍历 递归
const maxDepth = function(root) {
  if (!root) return 0;
  let res = 0;
  const preorder = (node, curLevel) => {
    if (!node) return;
    res = Math.max(res, curLevel);
    preorder(node.left, curLevel + 1);
    preorder(node.right, curLevel + 1);
  };

  preorder(root, 1);
  return res;
}
/*
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
/*
  从上到下依次挨层级遍历，最后反转
*/
var levelOrderBottom = function(root) {
  if (!root) return [];
  // 递归 前序遍历
  const preorder = (node, curLevel, res) => {
    if (!node) return;
    if (res.length === curLevel) {
      res.push([node.val]);
    } else {
      res[curLevel].push(node.val);
    }
    preorder(node.left, curLevel + 1, res);
    preorder(node.right, curLevel + 1, res);
  };
  const res = [];
  preorder(root, 0 ,res);
  res.reverse();
  return res;
};
/*
给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

输入：root = [1,null,2,3]
输出：[1,2,3]

输入：root = []
输出：[]

输入：root = [1]
输出：[1]
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
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  // 采用迭代法
  /*
    1. 声明一个空数组，用来返回前序遍历的返回结果
    2. 如果root节点为空，则直接返回
    3. 新建一个栈来存放非空节点，然后根据 “先进后出”的特点先将存在的右节点入栈，
      再将存在的左节点入栈，直到栈空为止
  */
  let arr = [];
  if (!root) return arr;
  const stack = [root]
  while(stack.length) {
    let cur = stack.pop();
    arr.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }

  return arr;
};
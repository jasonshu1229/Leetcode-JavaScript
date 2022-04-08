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

/*
  递归的三个步骤：
    1. 明确递归函数需要做什么：getNode 遍历节点
    2. 找出递归的终止条件
    3. 写出递归函数的等价关系式，核心逻辑
*/
var preorderTraversal = function (root) {
  if (!root) return [];

  const preorder = (node, res) => {
    if (!node) return; // // 递归的终止条件
    res.push(node.val);
    preorder(node.left, res);
    preorder(node.right, res);
  }
  // 把 root 前序遍历结果放到 arr 中
  let res = [];
  preorder(root, res);

  return res;
};
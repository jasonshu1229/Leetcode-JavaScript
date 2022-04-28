/*
给定二叉树的根节点 root ，返回所有左叶子之和。
    3
   / \
  9   20
      / \
     15  7
输入: root = [3,9,20,null,null,15,7] 
输出: 24 
解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 1.DFS 前序递归遍历 
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  // DFS 前序递归遍历 左叶子节点
  // 注意：左叶子节点需要满足两个条件：1. 是叶子节点 2. 当前节点是父亲节点的左子树
  if (!root) return 0
  let sum = 0;
  const preorder = (node, parent) => {
    if (!node) return;
    if (!node.left && !node.right && node == parent.left) {
      sum += node.val;
    }
    preorder(node.left, node);
    preorder(node.right, node);
  };
  preorder(root, root);
  return sum;
};

// 2. BFS 迭代遍历左叶子之和
var sumOfLeftLeaves = function(root) {
  // BFS 迭代遍历左叶子之和
  // 注意：左叶子节点需要满足两个条件：1. 是叶子节点 2. 当前节点是父亲节点的左子树
  if (!root) return 0;

  const isLeafNode = (node) => {
    return !node.left && !node.right;
  };

  let sum = 0;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) { // 遍历每一层节点
      const cur = queue.shift();
      if (cur.left) {
        if (isLeafNode(cur.left)) sum += cur.left.val;
        else queue.push(cur.left); // 当前节点的左节点不是叶子节点（当前节点的左节点还有左or右节点）
      } 
      if (cur.right && !isLeafNode(cur.right)) queue.push(cur.right);
    }
  }
  return sum;
};

// 3. DFS 迭代遍历左叶子之和
/*
  思路：左叶子之和 = 这棵树里左子树里所有的左子树之和 + 这棵树里右子树里所有的左子树之和
  注意：如果是左叶子节点的话，就返回左叶子节点里的值，空树就返回 0
*/
var sumOfLeftLeaves = function(root) {
  // 注意：左叶子节点需要满足两个条件：1. 是叶子节点 2. 当前节点是父亲节点的左子树
  if (!root) return 0;

  const postorder = (node, parent) => {
    if (!node) return 0;
    if (!node.left && !node.right && parent.left == node) {
      return node.val;
    }
    // 以当前节点的左节点所有左叶子节点之和
    const leftLeavesSum = postorder(node.left, node);
    // 以当前节点的右节点所有左叶子节点之和
    const rightLeavesSum = postorder(node.right, node);
    // 处理根节点
    return leftLeavesSum + rightLeavesSum;
  };

  return postorder(root, root);
};
/*
给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

    3
   / \
  9   20
      / \
     15  7

输入：root = [3,9,20,null,null,15,7]
输出：true
       1
      / \
     2   2
    / \    
   3  3   
  / \
 4   4
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
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
 * @return {boolean}
 */
/*
  思路：由104题二叉树的最大深度，自下而上的后序遍历衍生二来。求左右子树最大深度相减的绝对值。
  注意：在遍历当前节点时，是否已经遇到标记为-1的不平衡二叉树节点了。
*/
var isBalanced = function(root) {
  // 求以node为根节点的二叉树的最大深度
  const maxDepth = (node) => {
    if (!node) return 0; // 节点不存在，返回深度为0
    const leftMaxDepth = maxDepth(node.left);
    const rightMaxDepth = maxDepth(node.right);
    // 在遍历时已经遇到标记当前节点最大深度为-1的节点就不用往下执行了
    if (leftMaxDepth === -1 || rightMaxDepth === -1) {
      return -1;
    }
    // 左右子节点的最大深度相减绝对值小于1的话，已不平衡
    if (Math.abs(leftMaxDepth - rightMaxDepth) > 1) {
      return -1; // 标记当前节点的最大深度为 -1 
    }
    // 处理根节点
    return Math.max(leftMaxDepth, rightMaxDepth) + 1;
  };
  return maxDepth(root) >= 0;
};
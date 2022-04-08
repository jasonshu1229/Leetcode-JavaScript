/*
给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

示例 :
给定二叉树
          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

注意：两结点之间的路径长度是以它们之间边的数目表示。
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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  // 求每一个节点的左右子树的最大深度，然后左右子树最大深度之和的那个长度就是二叉树的直径
  // 和 104题 求二叉树的最大深度有关联
  // 采用的是先 后序迭代二叉树的最大深度，再求左右子树最大深度之和
  if (!root) return 0

  let res = 0
  const maxDepth = (node) => {
      if (!node) return 0
      const leftMaxDepth = maxDepth(node.left)
      const rightMaxDepth = maxDepth(node.right)
      res = Math.max(res, leftMaxDepth + rightMaxDepth)
      return Math.max(leftMaxDepth, rightMaxDepth) + 1
  }

  maxDepth(root)
  return res
};
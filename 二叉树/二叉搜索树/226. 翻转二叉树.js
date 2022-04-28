/*
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
*/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // DFS 后序遍历
  // 翻转以 node 为根的二叉树，然后返回翻转后的二叉树根节点
  const dfs = (node) => {
    if (!node) return null; // 空节点返回 null
    if (!node.left && !node.right) return node; // 返回叶子节点

    let left = dfs(node.left);
    let right = dfs(node.right);

    node.left = right; // 遍历完的左节点 = 右节点 自下而上交换位置
    node.right = left;

    return node; // 然后返回翻转后的二叉树根节点
  }
  return dfs(root);
};
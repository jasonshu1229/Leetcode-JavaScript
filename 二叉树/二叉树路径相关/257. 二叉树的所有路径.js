/*
给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
叶子节点 是指没有子节点的节点。

输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]
*/

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  if (!root) return [];
  let res = [];
  const dfs = (node, path) => {
    if (!node) return;
    if (!node.left && !node.right) {
      return res.push(path + node.val.toString());
    }
    dfs(node.left, path + node.val.toString() + '->');
    dfs(node.right, path + node.val.toString() + '->');
  };
  dfs(root, '');
  return res;
};
/*
给你一个二叉树的根节点 root ， 检查它是否轴对称。
*/

var isSymmetric = function(root) {
  if (!root) return true; // 空树
  return isSymmetricHelp(root, root);
};

var isSymmetricHelp = function(p, q) {
  // 1. 两棵节点都是叶子节点 => true
  // 2. 有一个是叶子节点，另一个不是 => false
  // 3. 每个节点的值不相同 => false
  // 4. 节点相同，比对左子树和右子树，左右子树均相同 => true
  if (!p && !q) {
    return true;
  } else if (!p || !q) {
    return false;
  } else if (p.val !== q.val) {
    return false;
  }
  // 跟节点相同继续向下比，比较对称的节点是否相同
  return isSymmetricHelp(p.left, q.right) && isSymmetricHelp(p.right, q.left);
};
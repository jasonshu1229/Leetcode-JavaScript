/*
给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
*/

var isSameTree = function(p, q) {
  // 1. 两棵空树相同 => true
  // 2. 有一颗树为空树 => false
  // 3. 根节点不相同 => false
  // 4. 根节点相同，比对左子树和右子树，左右子树均相同 => true
  if (!p && !q) {
    return true;
  } else if (!p || !q) {
    return false;
  } else if (p.val !== q.val) {
    return false;
  }
  // 跟节点相同继续向下比
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
/*
给你两棵二叉树： root1 和 root2 。
想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
返回合并后的二叉树。
注意: 合并过程必须从两个树的根节点开始。

输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
输出：[3,4,5,5,4,null,7]
*/

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
/*
  思路：从上到下遍历，遇到非空节点和空节点合并为非空节点；创建根节点，并合并它们的左右子树，再维护好新根节点和左右节点的关系。最后返回新根节点。
*/
// 合并以 root1、root2 为根节点的两棵树，返回合并之和的新二叉树的根节点
var mergeTrees = function(root1, root2) {
  // DFS 前序遍历 从上到下 深度优先搜索
  if (!root1) return root2; // 如果有一个节点为空，则返回另一个节点
  if (!root2) return root1;
  
  // 创建新的根节点，然后合并左子树，右子树，并维护好它们之间的关系
  const newNode = new TreeNode(root1.val + root2.val);
  // 先合并，再维护 newNode 与 left,right 的关系
  const left = mergeTrees(root1.left, root2.left);
  const right = mergeTrees(root1.right, root2.right);
  // 维护根节点与左右节点的关系
  newNode.left = left;
  newNode.right = right;

  return newNode;
};
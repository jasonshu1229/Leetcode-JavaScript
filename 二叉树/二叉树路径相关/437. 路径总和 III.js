/*
给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
*/
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
// DFS + 计算每个节点所有路径和
// 思路：前序遍历计算每个节点的路径列表，后序的话返回每个节点符合条件的路径数
var pathSum = function(root, targetSum) {
  // 返回以node为根节点的这棵二叉树里,节点之和等于targetSum的所有路径数目
  // parentPathSum：父亲节点的所有路径和列表
  const dfs = (node, parentPathSumList, targetSum) => {
    if (!node) return 0;

    let cnt = 0; // 当前的节点有多少个路径和 = targetSum
    let temp = []; // 初始化一个新的列表，存储每个节点的路径和(每个节点的路径和列表都是新的，独一无二的)
    for (let i = 0; i < parentPathSumList.length; i++) { // 计算当前节点的路径和列表
      let num = parentPathSumList[i] + node.val;
      temp.push(num);
      if (num == targetSum) cnt++;
    }
    temp.push(node.val);
    if (node.val == targetSum) cnt++; // 当前节点也算

    // 找到左/右子树里，节点之和等于targetSum的路径数
    const leftCnt = dfs(node.left,  temp, targetSum);
    const rightCnt = dfs(node.right, temp, targetSum);
    // cnt:当前节点的路径和 = targetSum 的数目
    return cnt + leftCnt + rightCnt;
  };
  return dfs(root, [], targetSum);
};
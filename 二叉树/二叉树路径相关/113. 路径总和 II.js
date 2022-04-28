/*
给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

叶子节点 是指没有子节点的节点。
*/
/*
  思路：从上到下遍历节点，用path保存当前遍历的路径。找到当前节点满足 curNodeTarget = parentNodeTarget - node.val 且是叶子节点的时候，往 res 数组加一条，然后回溯，删除path数组中当前节点。继续遍历左或右子树满足条件的情况。统一放在res数组中。
  主要：因为找出"所有"路径总和满足条件的，所以找出一条之后需要回溯，继续寻找下一条是否存在
*/
var pathSum = function(root, targetSum) {
  let res = []; // 存储所有满足条件的结果数组
  let path = []; // 存储当前满足条件的那条路径

  const dfs = (node, curNodeTarget) => {
    if (!node) return;
    path.push(node.val);
    curNodeTarget = curNodeTarget - node.val; // 计算遍历到当前节点的目标和
    if (!node.left && !node.right && curNodeTarget == 0) {
      res.push(path.slice()); // 拷贝一个新数组，避免在回溯的时候把path元素都删除成[]
    }
    dfs(node.left, curNodeTarget);
    dfs(node.right, curNodeTarget);
    path.pop(); // 遍历结束后，回溯当前节点，删除path中最后一个
  };
  dfs(root, targetSum);

  return res;
};
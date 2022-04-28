/*
给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。

    3
   / \
  9   20
      / \
     15  7
输入：root = [3,9,20,null,null,15,7]
输出：2
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
/*
  BFS思路：遍历每一层节点时，用队列保存下一层级的左右节点，遇到叶子节点（没有子节点的节点）就返回当前层。
*/
var minDepth = function(root) {
  // BFS 
  if (!root) return 0;

  let levels = 0; // 定义有多少层
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    levels++; // 因为有可能提前返回，所以把返回层级树提前（比如，根节点子节点时，应返回1）
    for (let i = 0; i < size; i++) { // 循环遍历每一层
      const cur = queue.shift();
      if (!cur.left && !cur.right) { // 当某一层的节点是叶子节点时，返回节点数量
        return levels;
      }
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }
  return levels;
};

/*
  DFS 迭代思路：获取每个子节点的深度，取子节点中深度最小的那个节点
*/
var minDepth = function(root) {
  if (!root) return 0
  // DFS 迭代 
  let res = Math.pow(2, 31) - 1;
  const stack = [];
  stack.push([root, 1]);
  while (stack.length) {
    const cur = stack.pop();
    const curNode = cur[0], curLevel = cur[1];
    if (!curNode.left && !curNode.right) res = Math.min(res, curLevel);
    if (curNode.right) stack.push([curNode.right, curLevel + 1]);
    if (curNode.left) stack.push([curNode.left, curLevel + 1]);
  }
  return res;
};

/*
  DFS 迭代思路：获取每个子节点的深度，取子节点中深度最小的那个节点
*/
var minDepth = function(root) {
  if (!root) return 0
  // DFS 前序遍历递归
  let res = Math.pow(2, 31) - 1;
  const preorder = (node,curLevel) => {
    if (!node) return;
    if (!node.left && !node.right) res = Math.min(res, curLevel);
    preorder(node.left, curLevel + 1);
    preorder(node.right, curLevel + 1);
  };
  preorder(root, 1);
  return res;
};

/*
  DFS 后序递归思路：获取左节点or右节点最小深度，再加上根节点的depth 1
  注意：遍历自下而上，遇到是叶子节点的直接返回深度为1；如果当前节点有一个left节点或right节点，而另一侧不存在时，直接返回有子节点的深度加1，然后取左右子树的最小深度 + 1
*/
var minDepth = function(root) {
  if (!root) return 0;
  // DFS 后序递归
  if (!root.left && !root.right) return 1;
  
  let leftMinDepth = minDepth(root.left);
  let rightMinDepth = minDepth(root.right);

  // 处理根节点
  if (!root.left) {
    return rightMinDepth + 1;
  } else if (!root.right) {
    return leftMinDepth + 1;
  } else {
    return Math.min(leftMinDepth, rightMinDepth) + 1;
  }
};
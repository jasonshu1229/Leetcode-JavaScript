/*
给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
*/

var largestValues = function(root) {
  // BFS
  if (!root) return [];

  const res = [], queue = [];
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    let maxValue = -Math.pow(2, 31); // 定义一个最小值用于比较
    for (let i = 0; i < size; i++) {
      const cur = queue.shift();
      maxValue = Math.max(maxValue, cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(maxValue);
  }
  return res;
};
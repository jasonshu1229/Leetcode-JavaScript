/*
给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
*/

var rightSideView = function(root) {
  // BFS
  if (!root) return [];

  const res = [], queue = [];
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const cur = queue.shift();
      if (i === size -1) res.push(cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
  }
  return res;
};
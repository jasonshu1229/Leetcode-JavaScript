/*
给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
    3
   / \
  9  20
    /  \
   15   7
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]
*/

/* 
  思路：BFS 迭代法
   注意：层序遍历一定是从左往右，在知道每层节点的数目时，先声明同等size的数组，然后按顺序插入到对应位置
*/
var zigzagLevelOrder = function(root) {
  if (!root) return [];
  // BFS
  let res = [];
  const queue = [];
  queue.push(root);
  let fromRightToLeft = false;
  while (queue.length) {
    const size = queue.length;
    const levelNodes = new Array(size).fill(0); // 因为知道当前层有多少个节点，可以直接把数组长度声明出来
    for (let i = 0; i < size; i++) {
      const cur = queue.shift();
      // 如果是从右往左的话，那么将节点值从后往前放，否则从前往后放
      const index = fromRightToLeft ? (size - 1 - i) : i;
      levelNodes[index] = cur.val;
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(levelNodes);
    fromRightToLeft = !fromRightToLeft;
  }
  return res;
};

// DFS
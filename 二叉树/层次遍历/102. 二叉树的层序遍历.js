/*
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
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
 * @return {number[][]}
 */
/*
  思路：用队列保存每一层的节点，当处理每一层节点时，应该先从队列的队头拉出来，放进当前层级的结果集，
    然后找它下一层的左右节点，有的话直接放进队列，循环往复就能得到结果
*/
var levelOrder = function(root) {
  if (!root) return [];

  // 队列，先进先出
  const res = [], queue = [];
  queue.push(root);
  while (queue.length) {
    const levelNodes = []; // 新建一个存储当前层结点的数组
    const size = queue.length; // 每轮循环遍历处理一层的节点
    for (let i = 0; i < size; i++) {
      const cur = queue.shift();
      levelNodes.push(cur.val);
      // 将遍历处理的节点的左右节点入队，等待后续的处理
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    res.push(levelNodes)
  }
  return res;
}

/*
  思路：用栈保存每一层节点的值和层级，接着用迭代法前序遍历的思想，把出栈的元素插入到对应层级上，插入后继续遍历左右子树。
  注意：第二层级的元素，应该插入到 curLevel 为 1的位置，此时的 res.length 应该为2，如果和curLevel相等的话，（当前元素应该是当前层级的第一个元素）所以应直接插入；否则插入到对应 curLevel 位置。
*/
var levelOrder = function(root) {
  if (!root) return [];
  // 迭代前序遍历
  const res = [], stack = [];
  stack.push([root, 0]); // 存储节点和对应层级
  while (stack.length) {
    const cur = stack.pop();
    const curNode = cur[0], curLevel = cur[1]; // 分别取出当前的节点，和所在层级
    if (res.length === curLevel) { // 当前元素没有对应层级的话，应直接插入
      res.push([curNode.val]);
    } else {
      res[curLevel].push(curNode.val); // 有当前层级的话，则直接插到对应层级上面
    }
    // 继续遍历左右子树
    if (curNode.right) stack.push([curNode.right, curLevel + 1]);
    if (curNode.left) stack.push([curNode.left, curLevel + 1]);
  }

  return res;
};

//  递归版 前序遍历
var levelOrderBottom = function(root) {
  if (!root) return [];
  // 递归 前序遍历
  const preorder = (node, curLevel, res) => {
    if (!node) return;
    if (res.length === curLevel) {
      res.push([node.val]);
    } else {
      res[curLevel].push(node.val);
    }
    preorder(node.left, curLevel + 1, res);
    preorder(node.right, curLevel + 1, res);
  };
  const res = [];
  preorder(root, 0 ,res);
  return res;
};
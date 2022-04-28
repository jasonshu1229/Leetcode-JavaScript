/**
 * 获取以root为根节点的所有路径集合-穷举法
 * @param {*} root 
 */
// 获取从根节点到叶子节点的所有路径和
var getAllPath = function(root) {
  let res = [], path = [];

  const dfs = (node, path, res) => {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right) {
      // 添加路径的时候需要 new 一个新的 ArrayList 的原因：
      // 1. 使得 res 中的对象和 path 不是同一个对象
      res.push(new Array().concat(path));
    }
    dfs(node.left, path, res);
    dfs(node.right, path, res);
    // 回溯的过程中，将当前的节点从 path 中删除
    path.pop();
  }
  dfs(root, path, res);
  return res;
};

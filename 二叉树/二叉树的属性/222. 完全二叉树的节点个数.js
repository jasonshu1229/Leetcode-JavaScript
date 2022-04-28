/*
你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。
      1
    /   \
   2     3
  / \   / 
 4   5 6

输入：root = [1,2,3,4,5,6]
输出：6
*/

/*
                                       1
                                   /       \
                                 2           3
                                / \        /   \
                              4    5      6     7
                             / \  / \    /  \  / \
                            8  9 10 11  12 13 14 15
                           low         mid       hight
  level:当前有多少层
  最少的节点数： low = 2^level 
  最多的节点数： high = 2^(level+1) - 1
  寻找mid：从上到下，按层级找mid的时间复杂度 O(logn)
  寻找最后一层的最小值：二分法 时间复杂度 O(logn)
  时间复杂度： O(logn) * O(logn) < O(n)
*/

var countNodes = function(root) {
  // DFS后序遍历递归 时间复杂度 O(n) 自下而上
  // 该树的个数 = 以根节点为首的左子树节点个数 + 以根节点为首的右子树节点个数
  if (!root) return 0;

  let leftNodes = countNodes(root.left);
  let rightNodes = countNodes(root.right);
  return leftNodes + rightNodes + 1;
};
/*
  思路：二分查找
*/
/**
 * @param {TreeNode} root
 * @return {number}
 */
/*
  level:当前有多少层
  最少的节点数： low = 2^level 
  最多的节点数： high = 2^(level+1) - 1
  寻找mid：从上到下，按层级找mid的时间复杂度 O(logn)
  寻找最后一层的最小值：二分法 时间复杂度 O(logn)
  时间复杂度： O(logn) * O(logn) < O(n)
*/
/*
  步骤：1. 沿着左子节点，找到此完全二叉树有多少层
        根据完全二叉树的性质，得知该树的节点范围 [2^level, 2^(level+1) - 1]
       2. 根据区间范围，利用二分法 mid 和low和right的比较求出mid所在的区间左边界
       3. 查找mid是否存在（查找某个节点是否存在）
       4. 根据二进制的查找规则确定mid是否存在
*/
var countNodes = function(root) {
  if (!root) return 0;
  
  let level = 0,cur = root;
  // 因为是完全二叉树，所有的节点都会靠左叶子节点
  while (cur.left) {
    level++;
    cur = cur.left;
  }
  // 利用二进制进位的性质，验证当前节点是否存在
  const exists = (k) => {
    let mask = 1 << (level - 1);
    let node = root;
    while (node && mask > 0) {
        if (mask & k) {
            node = node.right;
        } else {
            node = node.left;
        }
        mask >>= 1;
    }
    return node != null;
  };

  // 得知节点范围，根据二分mid 和low和right的比较求出mid所在的区间左边界
  let low = 1 << level, high = (1 << (level + 1)) - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low + 1) / 2);
    // 如果这棵树存在mid，则把左指针移动到mid
    if (exists(mid)) {
      low = mid;
    } else {
      // 如果不存在，则把最大区间边界缩小
      high = mid - 1;
    }
  }

  return low;
};
# Leetcode 题解 - 树
<!-- GFM-TOC -->
* [Leetcode 题解 - 树](#leetcode-题解---树)
    * [递归](#递归)
        * [1. 二叉树的最大深度](#1-二叉树的最大深度)
        * [2. 两节点的最长路径(二叉树)](#2-二叉树的直径)
        * [3. 两节点的最长路径](#3-两节点的最长路径)
        * [4. 翻转树](#4-翻转树)
        * [5. 归并两棵树](#5-归并两棵树)
        * [6. 判断路径和是否等于一个数](#6-判断路径和是否等于一个数)
        * [7. 统计路径和等于一个数的路径数量](#7-统计路径和等于一个数的路径数量)
        * [8. 子树](#8-子树)
        * [9. 树的对称](#9-树的对称)
        * [10. 最小路径](#10-最小路径)
        * [11. 统计左叶子节点的和](#11-统计左叶子节点的和)
        * [12. 相同节点值的最大路径长度](#12-相同节点值的最大路径长度)
        * [13. 间隔遍历](#13-间隔遍历)
        * [14. 找出二叉树中第二小的节点](#14-找出二叉树中第二小的节点)
    * [层次遍历](#层次遍历)
        * [1. 一棵树每层节点的平均数](#1-一棵树每层节点的平均数)
        * [2. 得到左下角的节点](#2-得到左下角的节点)
    * [前中后序遍历](#前中后序遍历)
        * [1. 非递归实现二叉树的前序遍历](#1-非递归实现二叉树的前序遍历)
        * [1.1 二叉树的前序遍历-递归版](#1.1-二叉树的前序遍历-递归版)
        * [2. 非递归实现二叉树的后序遍历](#2-非递归实现二叉树的后序遍历)
        * [2.1 二叉树的后序遍历-递归版](#2.1-二叉树的后序遍历-递归版)
        * [3. 非递归实现二叉树的中序遍历](#3-非递归实现二叉树的中序遍历)
        * [3.1 二叉树的中序遍历-递归版](#3.1-二叉树的中序遍历-递归版)
    * [BST](#bst)
        * [1. 修剪二叉查找树](#1-修剪二叉查找树)
        * [2. 寻找二叉查找树的第 k 个元素](#2-寻找二叉查找树的第-k-个元素)
        * [3. 把二叉查找树每个节点的值都加上比它大的节点的值](#3-把二叉查找树每个节点的值都加上比它大的节点的值)
        * [4. 二叉查找树的最近公共祖先](#4-二叉查找树的最近公共祖先)
        * [5. 二叉树的最近公共祖先](#5-二叉树的最近公共祖先)
        * [6. 从有序数组中构造二叉查找树](#6-从有序数组中构造二叉查找树)
        * [7. 根据有序链表构造平衡的二叉查找树](#7-根据有序链表构造平衡的二叉查找树)
        * [8. 在二叉查找树中寻找两个节点，使它们的和为一个给定值](#8-在二叉查找树中寻找两个节点，使它们的和为一个给定值)
        * [9. 在二叉查找树中查找两个节点之差的最小绝对值](#9-在二叉查找树中查找两个节点之差的最小绝对值)
        * [10. 寻找二叉查找树中出现次数最多的值](#10-寻找二叉查找树中出现次数最多的值)
    * [Trie](#trie)
        * [1. 实现一个 Trie](#1-实现一个-trie)
        * [2. 实现一个 Trie，用来求前缀和](#2-实现一个-trie，用来求前缀和)
<!-- GFM-TOC -->


## 递归

树是一种递归结构，很多树的问题可以使用递归（深度优先遍历DFS和广度优先遍历BFS）来处理。

### 1. 二叉树的最大深度

104\. 二叉树的最大深度 (简单)

[Leetcode](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/) / [力扣](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```js
var maxDepth = function(root) {
  // BFS迭代
  if (!root) return 0;
  const queue = [];
  queue.push(root);
  const levels = 0; // 定义有多少层
  while (queue.length) {
    const size = queue.length; // 记住当前层有多少个节点
    // 循环遍历每一层节点进行处理(for循环每次执行完，都代表当前层遍历完毕)
    for (let i = 0; i < size; i++) { 
      const cur = queue.shift();
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    levels++;
  }
  return levels;
};
```

```js
// DFS 前序遍历 递归
const maxDepth = function(root) {
  if (!root) return 0;
  let res = 0;
  const preorder = (node, curLevel) => {
    if (!node) return;
    res = Math.max(res, curLevel);
    preorder(node.left, curLevel + 1);
    preorder(node.right, curLevel + 1);
  };

  preorder(root, 1);
  return res;
}
```

### 2. 二叉树的直径

543\. 二叉树的直径 (简单)

[Leetcode](https://leetcode-cn.com/problems/diameter-of-binary-tree/) / [力扣](https://leetcode-cn.com/problems/diameter-of-binary-tree/)


```
给定二叉树
          1
         / \
        2   3
       / \     
      4   5    
返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

注意：两结点之间的路径长度是以它们之间边的数目表示。
```

思路：求每一个节点的左右子树的最大深度，然后左右子树最大深度之和的那个长度就是二叉树的直径。（和104题求二叉树的最大深度有关联）

```js
var diameterOfBinaryTree = function(root) {
  // 采用的是先 后序迭代二叉树的最大深度，再求左右子树最大深度之和
  if (!root) return 0

  let res = 0
  const maxDepth = (node) => {
      if (!node) return 0
      const leftMaxDepth = maxDepth(node.left)
      const rightMaxDepth = maxDepth(node.right)
      res = Math.max(res, leftMaxDepth + rightMaxDepth)
      return Math.max(leftMaxDepth, rightMaxDepth) + 1
  }

  maxDepth(root)
  return res
};
```

## 层次遍历

### 1. 二叉树的层序遍历

102\. 二叉树的层序遍历 (中等)

[Leetcode](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/) / [力扣](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```
    3
   / \
  9   20
      / \
     15  7
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```
 
思路：用队列保存每一层的节点，当处理每一层节点时，应该先从队列的队头拉出来，放进当前层级的结果集，
然后找它下一层的左右节点，有的话直接放进队列，循环往复就能得到结果

```js
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
};
```

## 前中后序遍历

```
    1
   / \
  2   3
 / \   \
4   5   6
```
- 层次遍历顺序：[1 2 3 4 5 6]
- 前序遍历顺序：[1 2 4 5 3 6]
- 中序遍历顺序：[4 2 5 1 3 6]
- 后序遍历顺序：[4 5 2 6 3 1]

### 1. 非递归实现二叉树的前序遍历

144\. 二叉树的前序遍历 (简单)

[Leetcode](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/) / [力扣](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```js
var preorderTraversal = function(root) {
  /*
    1. 声明一个空数组，用来返回前序遍历的返回结果
    2. 如果root节点为空，则直接返回
    3. 新建一个栈来存放非空节点，然后根据 “先进后出”的特点先将存在的右节点入栈，
      再将存在的左节点入栈，直到栈空为止
  */
  let arr = [];
  if (!root) return arr;
  const stack = [root]
  while(stack.length) {
    let cur = stack.pop();
    arr.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }

  return arr;
};
```

### 1.1 二叉树的前序遍历-递归版

```js
var preorderTraversal = function (root) {
  if (!root) return [];

  const preorder = (node, res) => {
    if (!node) return; // // 递归的终止条件
    res.push(node.val);
    preorder(node.left, res);
    preorder(node.right, res);
  }
  // 把 root 前序遍历结果放到 arr 中
  let res = [];
  preorder(root, res);

  return res;
};
```

### 2. 非递归实现二叉树的后序遍历

145\. 二叉树的后续遍历 (简单)

[Leetcode](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/submissions/) / [力扣](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/submissions/)

前序遍历为 root -> left -> right，后序遍历为 left -> right -> root。可以修改前序遍历成为 root -> right -> left，那么这个顺序就和后序遍历正好相反。

```js
var postorderTraversal = function(root) {
  //  前：root -> left -> right 
  //  后：left -> right -> root
  if (!root) return [];
  const res = [], stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.push(cur.val);
    // 将前序遍历的 左右子树的遍历顺序翻转一下
    if (cur.left) stack.push(cur.left);
    if (cur.right) stack.push(cur.right);
  }
  res.reverse();
  return res;
};
```

### 2.1 二叉树的后序遍历-递归版

```js
var postorderTraversal = function(root) {
  //  前：root -> left -> right 
  //  后：left -> right -> root
  if (!root) return [];

  const postorder = (node, res) => {
    if (!node) return;
    postorder(node.left, res);
    postorder(node.right, res);
    res.push(node.val);
  };

  const res = [];
  postorder(root, res);
  return res;
};
```

### 3. 非递归实现二叉树的中序遍历

94\. 二叉树的后序遍历 (简单)

[Leetcode](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/) / [力扣](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```js
var inorderTraversal = function(root) {
  if (!root) return [];
  let res = []; // 存储遍历后的结果
  let stack = []; // 用栈遍历左子树等
  let cur = root; // 用来找到最左边的子节点
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur); // 把当前节点存入栈
      cur = cur.left; // 继续找左节点
    }
    // 退出while循环，就代表当前节点的左节点已为空
    const node = stack.pop(); // 找到左节点为空的那个节点的根节点
    res.push(node.val);
    cur = node.right; // 继续寻找右节点
  }
  return res;
};
```

### 3.1 二叉树的中序遍历-递归版

```js
var inorderTraversal = function(root) {
  if (!root) return [];
  // 递归
  const inorder = (node, res) => {
    if (!node) return;
    inorder(node.left, res);
    res.push(node.val);
    inorder(node.right, res);
  };
  const res = [];
  inorder(root, res);
  return res;
};
```
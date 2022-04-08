# Leetcode 题解 - 树
<!-- GFM-TOC -->
* [Leetcode 题解 - 树](#leetcode-题解---树)
    * [递归](#递归)
        * [1. 树的高度](#1-树的高度)
        * [2. 平衡树](#2-平衡树)
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

一棵树要么是空树，要么有两个指针，每个指针指向一棵树。树是一种递归结构，很多树的问题可以使用递归来处理。

### 1. 树的高度

104\. 树的高度 (简单)

[Leetcode](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/) / [力扣](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/)

```java
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
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
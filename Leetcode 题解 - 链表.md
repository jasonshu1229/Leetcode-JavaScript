# Leetcode 题解 - 链表
<!-- GFM-TOC -->
- [Leetcode 题解 - 链表](#leetcode-题解---链表)
  - [链表删除操作](#链表删除操作)
  
    - [1. 移除链表元素](#1-移除链表元素)
    - [2. 删除链表中的节点](#2-删除链表中的节点)
    - [3. 删除排序链表中的重复元素](#3-删除排序链表中的重复元素)
    - [4. 删除排序链表中的重复元素 II](#4-删除排序链表中的重复元素-ii)
    - [5. 链表的中间结点 - 快慢指针](#5-链表的中间结点) - 快慢指针
    - [6. 删除链表的倒数第 N 个结点](#6-删除链表的倒数第-n-个结点) - 快慢指针
  
  - [链表的环](#链表的环)
  
    - [1. 环形链表](#1-环形链表) - 快慢指针
    - [2. 环形链表 II](#2-环形链表 II) - 快慢指针
  
    <!-- GFM-TOC -->

## 链表删除操作

### 1. 移除链表元素

203\. 移除链表元素 (简单)

[Leetcode](https://leetcode.cn/problems/remove-linked-list-elements/) / [力扣](https://leetcode.cn/problems/remove-linked-list-elements/)

虚拟节点统一删除逻辑

```js
var removeElements = function(head, val) {
  // 不确定head节点会不会被删除，所以建一个虚拟头节点
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let prev = dummyNode, cur = head;
  while (cur) {
    if (cur.val == val) {
      prev.next = cur.next;
      cur.next = null;
      cur = prev.next; // 更新cur指针
    } else {
      prev = cur;
      cur = cur.next; // 前后指针都向前移动一位
    }
  }
  return dummyNode.next;
};
```

### 2. 删除链表中的节点

237\. 删除链表中的节点 (简单)

[Leetcode](https://leetcode-cn.com/problems/diameter-of-binary-tree/) / [力扣](https://leetcode-cn.com/problems/diameter-of-binary-tree/)

思路：把删除的那个点的值用后一个值来替代，以至于后面所有值都向前移动一个单位，就相当于删除最后一个节点了，所以需要 prev.next -> null

```js
var deleteNode = function(node) {
  let prev = null; // 用于保存要删除节点的前一个节点
  while (node) {
    const next = node.next;
    if (next) {
      node.val = next.val;
    } else {
      prev.next = null;
    }
    prev = node; // pre 向后移动一位
    node = node.next; // node 向后移动一位
  }
};
```

### 3. 删除排序链表中的重复元素

83\. 删除排序链表中的重复元素 (简单)

[Leetcode](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/) / [力扣](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

```js
var deleteDuplicates = function(head) {
  if (!head || !head.next) return head;

  let prev = head, curr = head.next;
  while (curr) {
      if (curr.val == prev.val) {
          prev.next = curr.next;
          curr.next = null;
      } else {
          prev = curr;
      }
      curr = prev.next;
  }
  return head;
};
```

### 4. 删除排序链表中的重复元素 II

82\. 删除排序链表中的重复元素 II (中等)

[Leetcode](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/) / [力扣](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)

给定一个已排序的链表的头 head，删除所有重复的元素，使每个元素只出现一次。返回 已排序的链表。

思路：遍历有序的链表(有序，只需要遍历一次)，删除重复的元素

步骤：<br>
    1. 新建虚拟头节点，防止链表头部节点元素被删除 <br>
    2. 如果cur.next 与 cur.next.next元素相同，应该删除它，及后面所有重复的元素
      记录重复的元素为 x，依次寻找
    <br>
    3. 如果cur.next 与 cur.next.next 元素不相同，说明只有一个元素 cur.next的节点不重复

```js
var deleteDuplicates = function (head) {
  if (!head || !head.next) return head;

  const dumyNode = new ListNode(-1);
  dumyNode.next = head;
  let cur = dumyNode;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      while (cur.next && cur.next.val === x) {
        // 删除 cur.next 节点
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }

  return dumyNode.next;
};
```

### 5. 链表的中间结点

876\. 链表的中间结点 (简单)

[Leetcode](https://leetcode.cn/problems/middle-of-the-linked-list/) / [力扣](https://leetcode.cn/problems/middle-of-the-linked-list/)

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。如果有两个中间结点，则返回第二个中间结点。

```js
var middleNode = function(head) {
  if (!head || !head.next) return head;

  let slow = head, fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

### 6. 删除链表的倒数第 N 个结点

19&剑指021\. 删除链表的倒数第 N 个结点 (中等) **【top100】**

[Leetcode](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) / [力扣](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

思路：未知具体节点时，采用快慢指针法<br>

步骤：

1. 快指针先走n个单位，然后慢指针和快指针同时向前移动一个单位<br>
2. 慢指针指向的下一节点，即为要删除的节点

注意：fast.next 不存在的情况，应及时返回头节点

```js
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0, head);
  let slow = (fast = dummy);

  while (n--) fast = fast.next;

  if (!fast) return dummy.next;
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;

  return dummy.next;
};
```

## 链表的环

### 1. 环形链表

141\. 环形链表 (简单) **【top100】**

[Leetcode](https://leetcode.cn/problems/linked-list-cycle/) / [力扣](https://leetcode.cn/problems/linked-list-cycle/)

给你一个链表的头节点 `head` ，判断链表中是否有环。

```js
var hasCycle = function (head) {
  // 判断环形链表时，采用双指针模拟追击法
  // 慢指针每次走一个节点，快指针每次走两个节点，如果有环，则终会相遇；否则，则不会相遇
  if (!head) return false;

  let slow = head;
  let fast = head.next;

  while (slow !== fast && fast && fast.next) {
    // 进入循环之后，定义快慢指针，出循环的边界条件是走到链表的 Null了，无路可走了。
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow === fast;
};
```

### 2. 环形链表 II

141&剑指022\. 环形链表 II (中等) **【top100】**

[Leetcode](https://leetcode.cn/problems/linked-list-cycle-ii/) / [力扣](https://leetcode.cn/problems/linked-list-cycle-ii/)

给定一个链表的头节点  `head` ，返回链表开始入环的第一个节点。 *如果链表无环，则返回 `null`。*

```js
var detectCycle = function (head) {
  if (head === null) return head;

  let slow = head;
  let fast = head;
  let isCycle = false;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      isCycle = true;
      break;
    }
  }

  if (!isCycle) return null;

  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};
```


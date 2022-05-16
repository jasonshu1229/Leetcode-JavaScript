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
    - [2. 环形链表II](#2-环形链表II) - 快慢指针
  
  - [链表交换/反转操作](#链表交换/反转操作)

    - [1. 反转链表](#1-反转链表) - 迭代 || 递归
    - [2. 反转链表II](#2-反转链表II) - 头插法
    - [3. 旋转链表](#3-旋转链表) - 快慢指针
    - [4. 奇偶链表](#4-奇偶链表) - 奇偶数节点指针
    - [5. 分隔链表](#5-分隔链表)
    - [6. 两两交换链表中的节点](#6-两两交换链表中的节点)
    - [7. 回文链表](#7-回文链表)
  
  - [链表排序操作](#链表排序操作)

    - [1. 分隔链表](#1-分隔链表)
  
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

### 2. 环形链表II

141&剑指022\. 环形链表II (中等) **【top100】**

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

## 链表交换/反转操作

### 1. 反转链表

206&剑指024\. 反转链表 (简单) **【top100】**

[Leetcode](https://leetcode.cn/problems/reverse-linked-list/) / [力扣](https://leetcode.cn/problems/reverse-linked-list/)

思路：遍历链表节点，用两个指针分别保存前和后的节点，交换两个指针的位置用于反转，反转的终止条件是 cur 为null<br>

注意：反转之前需要保存当前节点的下一个节点，用于串联下一个节点，否则交换完没有了联系

```js
var reverseList = function(head) {
  if (!head) return head;

  let prev = null;
  let cur = head;
  while (cur) { // 遍历当前节点
      let temNextNode = cur.next; // 反转之前保存当前节点的下一个节点
      cur.next = prev; // 反转 cur.next -> pre 
      prev = cur; // 把当前的节点变为前一个节点
      cur = temNextNode; // 更新当前的节点
  }
  return prev;
};
```

思路：递归，大问题转换为两个子问题，把head和head后面的节点分别递。

```js
var reverseList = function(head) {
  if (!head || !head.next) return head; // 递归的终止条件

  const p = reverseList(head.next); // 递 把链表分成最后只剩一个head
  head.next.next = head; // 归 向上查找，反转节点
  head.next = null;
  return p;
};
```

### 2. 反转链表II

92\. 反转链表II (中等)

[Leetcode](https://leetcode.cn/problems/reverse-linked-list-ii/) / [力扣](https://leetcode.cn/problems/reverse-linked-list-ii/)

头插法

```js
var reverseBetween = function(head, left, right) {
  const dummyNode = new ListNode(-1)
  dummyNode.next = head

  let prev = dummyNode
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next
  }

  let curr = prev.next
  for (let i = 0; i < right - left; i++) {
    const next = curr.next
    curr.next = next.next
    next.next = prev.next
    prev.next = next
  }

  return dummyNode.next
}
```

### 3. 旋转链表

61\. 旋转链表 (中等)

[Leetcode](https://leetcode.cn/problems/rotate-list/) / [力扣](https://leetcode.cn/problems/rotate-list/)

解题思路：<br>
1. 因为k有可能大于链表长度，所以需要先遍历链表，获取它的长度<br>
2. 让快指针先走k步，找到需要旋转的几个节点<br>
3. 慢指针和快指针一起走，当快指针走到旋转链表（返回的链表）的尾部。<br>
  3.1）把快指针指向的节点指向原链表的头部<br>
  3.2）把链表的头节点指向慢指针指向的下一个节点。<br>
       （因为慢指针停留的位置是返回的链表尾部）<br>
  3.3) 把慢指针指向的节点和下一节点断开练习<br>
4. 返回结束时，慢指针指向的下一节点

```js
var rotateRight = function(head, k) {
    if (!head || k === 0) return head;

    let len = 1;
    let cur = head;
    
    while(cur.next) {
        cur = cur.next;
        len += 1; // 遍历链表，求链表的长度
    }
    if (k % len == 0) return head;
    k = k%len; // 求出需要旋转移动的几个节点

    let dummy = new ListNode(-1);
    dummy.next = head;
    let fast = slow = dummy; // 声明快慢指针

    while(k--) fast = fast.next;  
    while(fast.next) {
        fast = fast.next;  // 找到快指针走到结尾时的节点，目的为了指向原链表的头部
        slow = slow.next;  // 此时的慢指针应该和下一节点断开，并指向 Null，链表的头节点也要指向“慢指针的下一节点”
    }
    fast.next = dummy.next; // 尾结点的指针指向原链表头节点
    dummy.next = slow.next; // 新链表的头节点，指向慢指针的下一节点
    slow.next = null; // 断开慢指针和下一节点的关系，并指向 Null
    return dummy.next;
};
```

### 4. 奇偶链表

328\. 奇偶链表 (中等)

[Leetcode](https://leetcode.cn/problems/odd-even-linked-list/) / [力扣](https://leetcode.cn/problems/odd-even-linked-list/)

思路：定义两个奇偶节点指针，找到初始的两个奇偶头节点，不断往后遍历，如果偶数节点存在或者偶数节点的下一个节点存在，则一直更新奇偶节点指针，最后把偶数头节点拼在奇数头节点的next位置

```js
var oddEvenList = function(head) {
  if (!head || !head.next || !head.next.next) return head;
  // 定义奇偶数节点指针
  let odd = head, even = head.next;
  // 定义偶数节点的头节点 -> 用于最后拼在奇数节点的后面
  let evenHead = head.next;

  while (even && even.next) { // 偶数节点比奇数节点大，位置靠前
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};
```

### 5. 分隔链表

725\. 奇偶链表 (中等)

[Leetcode](https://leetcode.cn/problems/split-linked-list-in-parts/) / [力扣](https://leetcode.cn/problems/split-linked-list-in-parts/)

```js
var splitListToParts = function(head, k) {
  let len = 0, cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }
  const width = Math.floor(len / k); // 每个组里应该有多少个节点
  const remainder = len % k; // 前几组里的节点数比后面组里的节点数多1
  const res = new Array(k); // 返回的数组的长度应该是k
  cur = head;
  // 把分割成的每个数组，里面的头节点给到里面的元素
  for (let i = 0; i < k; i++) {
    // 1.记录头节点(不变的头节点用于放入结果集) 2.统一node节点的处理，不用区分空还是非空了
    const dummyNode = new ListNode(-1); 
    let node = dummyNode; // 用于构建每一部分的链表
    let realWidh = width + (i < remainder ? 1 : 0); // 每一部分链表的真实长度
    for (let j = 0; j < realWidh; j++) {
      // if (!node) {
      //   node = new ListNode(cur.val); // 以当前节点的值构建新节点
      // } else {
      //   node.next = new ListNode(cur.val);
      //   node = node.next; // 更新 node 节点
      // }
      node.next = new ListNode(cur.val); // 以当前节点的值构建新节点
      node = node.next; // 更新 node 节点
      if (cur) cur = cur.next;
    }
    res[i] = dummyNode.next;
  }
  return res;
};
```

### 6. 两两交换链表中的节点

24\. 两两交换链表中的节点 (中等)

[Leetcode](https://leetcode.cn/problems/swap-nodes-in-pairs/) / [力扣](https://leetcode.cn/problems/swap-nodes-in-pairs/)

思路：因为head节点可能会改变，所以使用虚拟头节点。用前后指针找到要交换的两个节点的前一个节点和后一个节点。如果要交换的第二个数不存在了，就退出遍历。否则就用前后指针交换要移动的两个节点，并更新指针和节点的位置。

```js
var swapPairs = function(head) {
  // 画图 
  if (!head || !head.next) return head;
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let prev = dummyNode; // 找到要交换的两个节点前后指针
  let first = head;
  let second = head.next;
  while (second) {
    // 交换节点
    let next = second.next; // 只有second 不为null的时候，才有next，所以放在循环里
    prev.next = second;
    second.next = first;
    first.next = next; 
    // 更新要交换的节点位置和指针位置
    prev = first;
    first = next; // 在交换完之后 next 可能为空
    if (first == null) break; // 退出循环
    second = first.next; // first 有可能为空 如果second 也为空的话就退出循环了
  }
  return dummyNode.next;
};
```

### 7. 回文链表

234&剑指027\. 回文链表 (简单) **【top100】**

[Leetcode](https://leetcode.cn/problems/palindrome-linked-list/) / [力扣](https://leetcode.cn/problems/palindrome-linked-list/)

```
输入：head = [1,2,2,1]
输出：true
```

思路：<br>
    1. 找到链表的中间节点，并断开为前后两个链表<br>
    2. 反转后半部分链表<br>
    3. 分别设置两部分链表的头指针依次遍历节点，比较两个指针上的节点值
      右指针不存在的时候退出遍历

```js
var isPalindrome = function(head) {
  if (!head || !head.next) return true;
  let slow = head, fast = head.next;
  // 1. 寻找中间节点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next; 
  }
  // slow 指向了中间节点
  // 2. 从中间节点断开为两个链表
  let newHead = slow.next;
  slow.next = null;
  // 3. 反转后半部分链表，设置后半部分链表的头指针right
  let right = reverseList(newHead); 
  let left = head; // 设置前半部分链表的头指针 left
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  // right 为空的时候退出遍历
  return true;
};

var reverseList = function(head) {
  if (!head) return head;

  let prev = null;
  let cur = head;
  // 每次遍历cur到节点，都讲 cur的next指向 pre和cur都前进一位
  // 由于执行 while 循环体的原因 cur 又向后走了一个单位，所以 cur 最后指向的是 null
  while (cur) {
      let temNextNode = cur.next;
      cur.next = prev;
      prev = cur;
      cur = temNextNode;
  }
  return prev;
};
```

## 链表排序操作

### 1. 分隔链表

86\. 分隔链表 (中等)

[Leetcode](https://leetcode.cn/problems/partition-list/) / [力扣](https://leetcode.cn/problems/partition-list/)

```js
var partition = function(head, x) {
  if (!head || !head.next) return head;

  const smallHead = new ListNode(-1), largeHead = new ListNode(-1);
  let small = smallHead, large = largeHead;
  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }
  small.next = largeHead.next;
  large.next = null;
  return smallHead.next;
};
```


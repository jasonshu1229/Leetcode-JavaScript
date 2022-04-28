/*
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
*/

// 法一：哈希表记录A链表节点
var getIntersectionNode = function(headA, headB) {
  const set = new Set();
  while (headA) {
    set.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (set.has(headB)) return headB;
    headB = headB.next;
  }
  return null;
};

// 法二：双指针
/*
  思想：分别以A、B两个链表的头节点为双指针的起始点，A链表指针走一个，B链表指针走一个，哪个指针走到null，就继续接着 另一个链表走
  当它俩相遇时，就是相交的那个节点。
*/
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null;

  let a = headA, b = headB;
  while (a !== b) { // 两个指针一直不相遇
    a = (a === null) ? headB : a.next;
    b = (b === null) ? headA : b.next;
  }
  // a == b 时退出循环，如果有返回 a 节点，没有的话返回的也是 null
  return a;
};

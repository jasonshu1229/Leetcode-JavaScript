// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

/*
  思路：遍历链表节点，用两个指针分别保存前和后的节点，交换两个指针的位置用于反转，反转的终止条件是 cur 为null
  注意：反转之前需要保存当前节点的下一个节点，用于串联下一个节点，否则交换完没有了联系
*/
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

/*
  思路：递归，大问题转换为两个子问题，把head和head后面的节点分别递归，
*/
var reverseList = function(head) {
  // 递归的终止条件
  if (!head || !head.next) return head;
  const p = reverseList(head.next); // 递 把链表分成最后只剩一个head
  head.next.next = head; // 归 向上查找，反转节点
  head.next = null;
  return p;
};
/*
给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
*/

var removeNthFromEnd = function(head, n) {
  // 快慢指针 让快指针先走n+1步
  let dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let slow = dummyNode, fast = dummyNode;
  while(n-- >= 0 && fast !== null) { // fast 先走 n+1 步
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next; // slow.next -> 要删除的节点
  }

  slow.next = slow.next.next;
  return dummyNode.next;
};
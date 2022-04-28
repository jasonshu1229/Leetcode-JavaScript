/*
给定一个头结点为 head 的非空单链表，返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。
*/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  if (!head || !head.next) return head;

  let slow = head, fast = head;
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
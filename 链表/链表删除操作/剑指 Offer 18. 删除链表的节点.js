/*
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

注意：此题对比原题有改动

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
*/

// 注意：删除链表的最后一个节点
var deleteNode = function(head, val) {
  if (!head) return head;
  
  let dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let cur = dummyNode;

  while (cur && cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    }
    cur = cur.next;
  }
  return dummyNode.next;
};
/*
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

输入：head = [1,2]
输出：[2,1]

输入：head = []
输出：[]
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head 
 * @return {ListNode}
 */
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
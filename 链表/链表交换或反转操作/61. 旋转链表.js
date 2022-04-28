/*
给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
*/
/*
    解题思路：
      1. 因为k有可能大于链表长度，所以需要先遍历链表，获取它的长度
      2. 让快指针先走k步，找到需要旋转的几个节点
      3. 慢指针和快指针一起走，当快指针走到旋转链表（返回的链表）的尾部。
         3.1）把快指针指向的节点指向原链表的头部
         3.2）把链表的头节点指向慢指针指向的下一个节点。
              （因为慢指针停留的位置是返回的链表尾部）
         3.3) 把慢指针指向的节点和下一节点断开练习
      4. 返回结束时，慢指针指向的下一节点
  */
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
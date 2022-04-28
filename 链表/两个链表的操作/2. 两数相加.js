/*
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
*/

var addTwoNumbers = function(l1, l2) {
  const l3 = new ListNode(null); // 新建一个空的链表 存储返回和的结果
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0; // 进位符中的 "十位数"

  while (p1 || p2) {
      const v1 = p1 ? p1.val : 0;
      const v2 = p2 ? p2.val : 0;
      const val = v1 + v2 + carry;
      carry = Math.floor(val / 10);
      p3.next = new ListNode(val % 10); // 从p3的头节点下一个节点开始赋值
      // 链表递归
      if (p1) p1 = p1.next;
      if (p2) p2 = p2.next;
      p3 = p3.next; // p3一直有值
  }
  if (carry) {
      p3.next = new ListNode(carry);
  }
  return l3.next; // 头节点的下一个节点是存储的和
};
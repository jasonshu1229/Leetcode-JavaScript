/*
给你两个 非空 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表

输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
*/

var addTwoNumbers = function(l1, l2) {
  // 由于需要从个位数到十位数再到百位数相加，所以需要先将链表反转
  l1 = reverseList(l1);
  l2 = reverseList(l2);

  const retNode = addTwoNumbersHelp(l1, l2);
  return reverseList(retNode);
};

// 反转链表
var reverseList = function(head) {
  if (!head) return head;
  let prev = null, cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
}

// 按逆序排列的两链表相加（从个位数相加）
var addTwoNumbersHelp = function(l1, l2) {
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
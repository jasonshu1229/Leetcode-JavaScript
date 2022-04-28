/*
给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
输入：head = [1,2,2,1]
输出：true

输入：head = [1,2]
输出：false
*/

/*
  思路：
    1. 找到链表的中间节点，并断开为前后两个链表
    2. 反转后半部分链表
    3. 分别设置两部分链表的头指针依次遍历节点，比较两个指针上的节点值
      右指针不存在的时候退出遍历
*/
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
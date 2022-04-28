/*
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
*/

var reverseBetween = function(head, left, right) {
  // 因为头节点可能变化，所以设置虚拟头节点
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let prev = dummyNode;
  // 1.从虚拟头节点走 left-1步，来到left的前一个节点
  // 找到要反转左节点的前一个节点
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next;
  }
  // 2.找到要反转的左节点
  const leftNode = prev.next;
  // 寻找要反转的右节点
  let rightNode = leftNode;
  for (let i = 0; i < right - left; i++) {
    rightNode = rightNode.next;
  }
  // 3.找到右节点后面的节点
  const postRight = rightNode.next;
  // 4.切断left到right的子链表
  prev.next = null;
  rightNode.next = null;
  // 5.反转leftNode 到 rightNode
  reverseList(leftNode);
  // 6.将反转的子链表接回原链表
  prev.next = rightNode;
  leftNode.next = postRight;

  return dummyNode.next;
};

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
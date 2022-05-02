var removeElements = function(head, val) {
  // 不确定head节点会不会被删除，所以建一个虚拟头节点
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let prev = dummyNode, cur = head;
  while (cur) {
    if (cur.val == val) {
      prev.next = cur.next;
      cur.next = null;
      cur = prev.next; // 更新cur指针
    } else {
      prev = cur;
      cur = cur.next; // 前后指针都向前移动一位
    }
  }
  return dummyNode.next;
};
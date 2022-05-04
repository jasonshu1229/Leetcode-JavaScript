var deleteDuplicates = function (head) {
  if (!head || !head.next) return head;

  const dumyNode = new ListNode(-1);
  dumyNode.next = head;
  let cur = dumyNode;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      while (cur.next && cur.next.val === x) {
        // 删除 cur.next 节点
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }

  return dumyNode.next;
};
var deleteDuplicates = function(head) {
  if (!head || !head.next) return head;

  let prev = head, curr = head.next;
  while (curr) {
      if (curr.val == prev.val) {
          prev.next = curr.next;
          curr.next = null;
      } else {
          prev = curr;
      }
      curr = prev.next;
  }
  return head;
};
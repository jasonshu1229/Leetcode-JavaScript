var partition = function(head, x) {
  if (!head || !head.next) return head;

  const smallHead = new ListNode(-1), largeHead = new ListNode(-1);
  let small = smallHead, large = largeHead;
  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }
  small.next = largeHead.next;
  large.next = null;
  return smallHead.next;
};
var hasCycle = function (head) {
  // 判断环形链表时，采用双指针模拟追击法
  // 慢指针每次走一个节点，快指针每次走两个节点，如果有环，则终会相遇；否则，则不会相遇
  if (!head) return false;

  let slow = head;
  let fast = head.next;

  while (slow !== fast && fast && fast.next) {
    // 进入循环之后，定义快慢指针，出循环的边界条件是走到链表的 Null了，无路可走了。
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow === fast;
};
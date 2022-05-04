// 头插法
var reverseBetween = function(head, left, right) {
  const dummyNode = new ListNode(-1)
  dummyNode.next = head

  let prev = dummyNode
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next
  }

  let curr = prev.next
  for (let i = 0; i < right - left; i++) {
    const next = curr.next
    curr.next = next.next
    next.next = prev.next
    prev.next = next
  }

  return dummyNode.next
}
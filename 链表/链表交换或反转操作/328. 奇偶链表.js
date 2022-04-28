/*
给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。

第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。

请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。

你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。
*/

/*
  思路：定义两个奇偶节点指针，找到初始的两个奇偶头节点，不断往后遍历，如果偶数节点存在或者偶数节点的下一个节点存在，则一直更新奇偶节点指针，最后把偶数头节点拼在奇数头节点的next位置
*/
var oddEvenList = function(head) {
  if (!head || !head.next || !head.next.next) return head;
  // 定义奇偶数节点指针
  let odd = head, even = head.next;
  // 定义偶数节点的头节点 -> 用于最后拼在奇数节点的后面
  let evenHead = head.next;

  while (even && even.next) { // 偶数节点比奇数节点大，位置靠前
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};
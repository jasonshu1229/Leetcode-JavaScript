/*
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

输入：head = [1,2,3,4]
输出：[2,1,4,3]

输入：head = [1]
输出：[1]
*/

/*
  思路：因为head节点可能会改变，所以使用虚拟头节点。用前后指针找到要交换的两个节点的前一个节点和后一个节点。如果要交换的第二个数不存在了，就退出遍历。否则就用前后指针交换要移动的两个节点，并更新指针和节点的位置。
*/
var swapPairs = function(head) {
  // 画图 
  if (!head || !head.next) return head;
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;

  let prev = dummyNode; // 找到要交换的两个节点前后指针
  let first = head;
  let second = head.next;
  while (second) {
    // 交换节点
    let next = second.next; // 只有second 不为null的时候，才有next，所以放在循环里
    prev.next = second;
    second.next = first;
    first.next = next; 
    // 更新要交换的节点位置和指针位置
    prev = first;
    first = next; // 在交换完之后 next 可能为空
    if (first == null) break; // 退出循环
    second = first.next; // first 有可能为空 如果second 也为空的话就退出循环了
  }
  return dummyNode.next;
};
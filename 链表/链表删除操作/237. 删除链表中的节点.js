/*
请编写一个函数，用于 删除单链表中某个特定节点 。在设计函数时需要注意，你无法访问链表的头节点 head ，只能直接访问 要被删除的节点 。

题目数据保证需要删除的节点 不是末尾节点 。

输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
*/

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
/*
  思路：把删除的那个点的值用后一个值来替代，以至于后面所有值都向前移动一个单位，就相当于删除最后一个节点了，所以需要 prev.next -> null
*/
var deleteNode = function(node) {
  let prev = null; // 用于保存要删除节点的前一个节点
  while (node) {
    const next = node.next;
    if (next) {
      node.val = next.val;
    } else {
      prev.next = null;
    }
    prev = node; // pre 向后移动一位
    node = node.next; // node 向后移动一位
  }
};
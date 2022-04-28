/*
给定单个链表的头 head ，使用 插入排序 对链表进行排序，并返回 排序后链表的头 。

插入排序 算法的步骤:

插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
重复直到所有输入数据插入完为止。
下面是插入排序算法的一个图形示例。部分排序的列表(黑色)最初只包含列表中的第一个元素。每次迭代时，从输入数据中删除一个元素(红色)，并就地插入已排序的列表中。

对链表进行插入排序。

输入: head = [4,2,1,3]
输出: [1,2,3,4]
*/

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
  if (!head || !head.next) return head;

  const dummyNode = new ListNode(-1);
  dummyNode.next = head;
  let prev = head, cur = head.next;
  while (cur) {
    if (cur.val >= prev.val) {
      prev = cur;
      cur = cur.next; // 更新节点
    } else {
      // 从前往后找到第一个大于 cur.val 的节点(使用虚拟节点查找)
      let p = dummyNode;
      // 说明：这里的 p.next 不可能为空
      // 因为 p 从头开始，最远可以到达的节点是 curr 的前一个节点
      // 所以 p.next 不可能为 null，我这里加上 p.next 的判空
      while (p.next && p.next.val < cur.val) {
        p = p.next;
      }
      // 将 cur 节点插入到 p 和 p.next 之间
      prev.next = cur.next;
      cur.next = p.next; // 注意：这里不是 prev.next 因为 prev 不断更新
      p.next = cur;

      cur = prev.next; // 更新 cur 节点
    }
  }
  return dummyNode.next;
};
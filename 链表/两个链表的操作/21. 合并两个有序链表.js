/*
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
*/
// 时间复杂度：O(2n)
// 迭代法
var mergeTwoLists = function(list1, list2) {
  // 因为头节点可变化，所以新建虚拟头节点
  let dummy = new ListNode(-1);
  // 声明变量存储两个链表中最小的节点，赋值到新链表的最后一个节点位置
  let cur = dummy; 
  while (list1 && list2) {
    if (list1.val < list2.val) {
      // 取两个链表的最小值节点，放在新链表的最后一个节点
      cur.next = list1;
      // 继续移动指针
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    // 更新新链表的尾节点
    cur = cur.next;
  }
  // 如果有哪一个链表不为空，直接它接入到新链表的尾节点位置
  if (list1) cur.next = list1;
  if (list2) cur.next = list2;

  return dummy.next;
};

// 递归法
/*
  大问题可以拆解成若干个子问题
  思路：
    1. 递：比较l1节点和l2节点的最小的值，把最小值的节点单独拆分出来，指向另外两个链表合并的头节点
        子问题是最小值的那个节点，和两个链表合并后的值，不断递归
      归：并返回最小值的那个节点
    2. 终止条件就是有一个链表遍历到结束 null
*/
var mergeTwoLists = function(list1, list2) {
  // 递归
  if (!list1) return list2; // 递归的终止条件
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2); // 递：不断比较l1的下一个节点和l2的节点值进行合并
    return list1; // 归 返回最小节点的那个链表
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
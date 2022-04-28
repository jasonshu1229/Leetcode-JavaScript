/*
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

输入：head = [4,2,1,3]
输出：[1,2,3,4]
*/

/*
    思路：（归并排序）时间复杂度O(nlogn)，其中 n 是链表的长度，n层，每一层都是O(logn)的时间复杂度
     1. 利用双指针找到链表的中间节点，并切割分成两个链表
     2. 递归地对两个子链表分别排序
     3. 对两个排序后的子链表进行合并（合并两个有序链表）。
          创建新链表的指针不断指向两个链表中最小值的节点，并更新新链表指针的 next

        递归的终止条件：当原链表为空，或只有一个节点时，停止递归，返回原链表
  */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head || head.next === null) return head;

  // 使用快慢指针找到待排序链表的中间节点
  let fast = head;
  let slow = head;
  while (fast && fast.next?.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  // 此时 slow.next 即是链表的中间节点
  // 将原链表分割成两个链表
  let newList = slow.next;
  slow.next = null;
  // 递归地对左右链表取中间节点，并对左右两个链表排序
  let left = sortList(head);
  let right = sortList(newList);
  // 将两个链表合并为一个链表
  let dummy = new ListNode(-1);
  // 利用一个指针指向两个链表中最小值的节点
  let cur = dummy;
  while(left && right) {
    if (left.val < right.val) {
      cur.next = left;
      left = left.next;
    } else {
      cur.next = right;
      right = right.next;
    }
    // 新链表保存完最小值的节点后，需要更新新链表的指针位置
    cur = cur.next;
  }

  // 遍历完左右两个链表，还可能有剩余，直接放在新链表的后面
  cur.next = right === null ? left : right;

  return dummy.next;
};

/*
  考场点：1.求链表的中间节点 2. 合并两个有序链表
  注意：求链表的中间节点有一点变形（fast = head.next)
*/
var sortList = function(head) {
  // 归并排序
  if (!head || !head.next) return head;
  let slow = head, fast = head.next;
  // 1. 找到链表的中间节点，分为两个链表
  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const rightHead = slow.next;
  slow.next = null; // 断开为两个链表
  // 2. 分别排序左右两个链表
  const left = sortList(head); // 对左边的链表排序，返回排序好链表的头部
  const right = sortList(rightHead); // 对右边的链表排序
  // 3. 对排序好的两个链表进行合并
  return mergeTwoLists(left, right);
};

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
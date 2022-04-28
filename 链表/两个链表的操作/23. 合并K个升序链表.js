/*
给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
*/

/*
  * 法一：顺序合并（利用合并两个有序链表的方法合并k个）
  k个链表，每个链表的长度平均为n
  第一次合并outputList的长度为 2 * n
  第二次合并outputList的长度为 3 * n
  ...
  第i次合并outputList的长度为 (i+1) * n
  所以第i次合并的时间复杂度是：O((i+1) * n)
  一共需要n-1次合并，所以最终的时间复杂度为 O(k^2 * n)
*/
var mergeKLists = function(lists) {
  /*
    思路：先合并2个链表，再定义outputList为lists[0]，然后依次合并List[1]...List[n-1]，需要合并 k-1 次链表；
  */
  if (!lists || lists.length == 0) return null;

  let outputList = lists[0];
  for (let i = 1; i < lists.length; i++) {
    outputList = mergeTwoLists(outputList, lists[i]);
  }
  return outputList;
};

var mergeTwoLists = function(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  let dummyNode = new ListNode(-1);
  let cur = dummyNode; // 头节点可能会变化

  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next; // 把比较过后的最小值节点一直放在新链表的最后一个节点位置
  }
  if (list1) cur.next = list1;
  if (list2) cur.next = list2;
  return dummyNode.next;
}

/*
  * 法二：分治思想（归并排序）
  思路：分治思想（归并排序）
    在k个链表找到中点一分为二，再把每个链表都拆分成一个个的链表
    n：每个平均的链表的长度为n
    时间复杂度：O(k * n* logk)
    空间复杂度：O(logk)
*/
var mergeKLists = function(lists) {
  if (!lists || lists.length == 0) return null;
  return merge(lists, 0 ,lists.length - 1);
};

var merge = function(lists, left, right) {
  if (left == right) return lists[left]; // 区间重合只剩一个链表
  if (left > right) return null; // 没有任何链表

  let mid = left + Math.floor((right - left) / 2);
  const mergedLeftList = merge(lists, left, mid); // 合并左边的有序链表
  const mergedRightList = merge(lists, mid + 1, right); // 合并右边的有序链表
  
  // 合并左右两个区间的链表 返回大的有序链表
  return mergeTwoLists(mergedLeftList, mergedRightList);
}
var mergeTwoLists = function(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  const dummyNode = new ListNode(-1);
  let cur = dummyNode; // 头节点可能会变化

  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next; // 把比较过后的最小值节点一直放在新链表的最后一个节点位置
  }
  if (list1) cur.next = list1;
  if (list2) cur.next = list2;
  return dummyNode.next;
}


/*
给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。

每部分的长度应该尽可能的相等：任意两部分的长度差距不能超过 1 。这可能会导致有些部分为 null 。

这 k 个部分应该按照在链表中出现的顺序排列，并且排在前面的部分的长度应该大于或等于排在后面的长度。

返回一个由上述 k 部分组成的数组。

输入：head = [1,2,3], k = 5
输出：[[1],[2],[3],[],[]]
解释：
第一个元素 output[0] 为 output[0].val = 1 ，output[0].next = null 。
最后一个元素 output[4] 为 null ，但它作为 ListNode 的字符串表示是 [] 。

输入：head = [1,2,3,4,5,6,7,8,9,10], k = 3
输出：[[1,2,3,4],[5,6,7],[8,9,10]]
解释：
输入被分成了几个连续的部分，并且每部分的长度相差不超过 1 。前面部分的长度大于等于后面部分的长度。
*/

var splitListToParts = function(head, k) {
  let len = 0, cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }
  const width = Math.floor(len / k); // 每个组里应该有多少个节点
  const remainder = len % k; // 前几组里的节点数比后面组里的节点数多1
  const res = new Array(k); // 返回的数组的长度应该是k
  cur = head;
  // 把分割成的每个数组，里面的头节点给到里面的元素
  for (let i = 0; i < k; i++) {
    // 1.记录头节点(不变的头节点用于放入结果集) 2.统一node节点的处理，不用区分空还是非空了
    const dummyNode = new ListNode(-1); 
    let node = dummyNode; // 用于构建每一部分的链表
    let realWidh = width + (i < remainder ? 1 : 0); // 每一部分链表的真实长度
    for (let j = 0; j < realWidh; j++) {
      // if (!node) {
      //   node = new ListNode(cur.val); // 以当前节点的值构建新节点
      // } else {
      //   node.next = new ListNode(cur.val);
      //   node = node.next; // 更新 node 节点
      // }
      node.next = new ListNode(cur.val); // 以当前节点的值构建新节点
      node = node.next; // 更新 node 节点
      if (cur) cur = cur.next;
    }
    res[i] = dummyNode.next;
  }
  return res;
};
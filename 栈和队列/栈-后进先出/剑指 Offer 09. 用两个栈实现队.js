/*
用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
*/

var CQueue = function() {
  this.stack1 = []; // 输入栈
  this.stack2 = []; // 输出栈
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  // 输出栈不为空，则直接返回栈顶元素
  if (this.stack2.length) {
    return this.stack2.pop();
  } else {
    // 如果输出栈为空，则把输入栈的元素依次拿出来，加入输出栈
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
    if (!this.stack2.length) return -1;
    return this.stack2.pop();
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
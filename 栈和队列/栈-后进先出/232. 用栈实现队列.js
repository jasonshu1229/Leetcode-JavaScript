/*
请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false
说明：
你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
*/

/*
  思路：因为队列是先进先出，所以需要用两个栈，一个输入栈，一个输出栈，来模拟队列的进和出
  在push数据的时候，只要数据放进输入栈就好，但在pop的时候，操作就复杂一些，输出栈如果为空，就把进栈数据全部导入进来（注意是全部导入），再从出栈弹出数据，如果输出栈不为空，则直接从出栈弹出数据就可以了。最后如果进栈和出栈都为空的话，说明模拟的队列为空了。
*/
var MyQueue = function() {
  this.stack1 = []; // 输入栈
  this.stack2 = []; // 输出栈
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x); // 直接往输入栈里输入元素
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  // 判断输出栈的长度
  const size = this.stack2.length;
  if (size) {
    return this.stack2.pop(); // 直接返回输出栈栈顶的元素
  }
  // 如果输出栈为空，则把输入栈的元素依次拿出来，加入输出栈
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }
  // 最后从输出栈拿出元素
  return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  // 查看队头的元素，复用pop方法，然后把队头的元素，放进输出栈
  const x = this.pop();
  this.stack2.push(x);
  return x;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  // 队列为空，只需要让两个栈都为空
  return !this.stack1.length && !this.stack2.length;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
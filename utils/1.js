/**
 * 纯函数
 * 副作用
 * 1、相同参数返回相同结果
 * 2、不能修改作用域外面的变量
 */
function sum(a, b) {
	return a + b
}
function sum2 (a, b) {
  window.a=a
	return a + b
}


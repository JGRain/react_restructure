// 函数组件
export const FunctionComponent = 0
// 类组件的Fiber节点
export const ClassComponent = 1
// 还不知道是类组件还是函数组件
export const IndeterminateComponent = 2 // Before we know whether it is function or class
// 根Fibler的tag
export const HostRoot = 3 // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4 // A subtree. Could be an entry point to a different renderer.
// 原生Fiber的tag
export const HostComponent = 5
export const HostText = 6
export const Fragment = 7
export const Mode = 8

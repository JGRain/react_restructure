// 初次渲染的时候
let hoo1 = { memoizedState: '1', next: null }
let hoo2 = { memoizedState: '2', next: null }
hoo1.next = hoo2
let hoo3 = { memoizedState: '3', next: null }
hoo2.next = hoo3

let oldHooks = hoo1

let newhoo1 = { memoizedState: hoo1.memoizedState, next: null }
let newhoo2 = { memoizedState: hoo2.memoizedState, next: null }
newhoo1.next = newhoo2
let newhoo3 = { memoizedState: hoo3.memoizedState, next: null }
newhoo2.next = newhoo3

let newHooks = newhoo1

// 按位操作 0b开头表示二进制 0xa十六进制
const NoFlags = 0b00 // 0
const HasEffect = 0b001 // 1
const Layout = 0b010 // 2  React.useLayoutEffect
const Passive = 0b100 // 4  React.useEffect

let LayoutTag = HasEffect | Layout // 0b011
if (LayoutTag & (Layout !== NoFlags)) {
	// 0b010
	console.log('useLayoutEffect')
}
let tag = HasEffect | Passive // 0b101
if (tag & (Passive !== NoFlags)) {
	console.log('useEffect')
}

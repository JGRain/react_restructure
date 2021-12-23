class Parent {
	a() {
		console.log('a')
	}
}
class Child extends Parent {
	b() {
		console.log('b')
	}
}

let c = new Child()
c.b()
c.a()

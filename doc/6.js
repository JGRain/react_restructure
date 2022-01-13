class Parent {
  // 静态方法跟类有关系，跟实例没有关系
  static getParent() {
    console.log('getParent');
  }
  getName() {}
}
class Child extends Parent {}
Child.getParent();

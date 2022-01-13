class Component {}
function wrapper(OldComponent) {
  return class WrappedConponent {};
}
function logger(OldComponent) {
  return class LoggerWrapperComponent {};
}
let WrapperComponent = wrapper(Component);
let LoggerWrapperComponent = logger(WrapperComponent);

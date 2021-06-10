// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function testClassDeco(target: Function) {
  console.log(target);
  console.log(target.prototype);
}

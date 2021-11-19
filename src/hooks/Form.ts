import { reactive } from 'vue';
export default function() {
  const innerFormItems = reactive([]) as Array<FormItem>
  function refreshItems(formItems: Array<FormItem>) {
    innerFormItems.length = 0
    innerFormItems.push(...formItems.map((it: FormItem) => ({ ...it })))
  }
  function checkParams() {
    return innerFormItems.every(it => {
      return it.validator ? it.validator(it,
        innerFormItems.find((item: FormItem) => it.associatedOption === item.name)) : true
    })
  }
  function generatorParams() {
    if (innerFormItems && innerFormItems.length !== 0) {
      return innerFormItems.reduce((pre, cur) => {
        pre[cur.name] = cur.value
        return pre
      }, {} as any)
    }
    return {}
  }
  function resetParams() {
    innerFormItems.forEach(it => {
      it.reset ? it.reset() : (it.value = '')
    })
  }
  return {
    innerFormItems,
    refreshItems,
    checkParams,
    generatorParams,
    resetParams
  }
}

import { ref } from 'vue';
export default function() {
  function checkParams(innerFormItems: Array<FormItem>) {
    return innerFormItems.every(it => {
      return it.validator ? it.validator(it,
        innerFormItems.find((item: FormItem) => it.associatedOption === item.name)) : true
    })
  }
  function generatorParams(innerFormItems: Array<FormItem>) {
    if (innerFormItems && innerFormItems.length !== 0) {
      return innerFormItems.reduce((pre, cur) => {
        pre[cur.name] = cur.value
        return pre
      }, {} as any)
    }
    return {}
  }
  function resetParams(innerFormItems: Array<FormItem>) {
    innerFormItems.forEach(it => {
      it.reset ? it.reset() : (it.value = '')
    })
  }
  return {
    checkParams,
    generatorParams,
    resetParams
  }
}

import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      innerFormItems: [] as Array<FormItem>
    }
  },
  methods: {
    refreshItems() {
      this.innerFormItems = []
      this.innerFormItems.push(...(this as any).formItems.filter((it: FormItem) => !it.hidden))
    },
    checkParams() {
      return this.innerFormItems.every(it => {
        return it.validator?.call(this, it, 
          this.innerFormItems.find((item: FormItem)=> it.associatedOption === item.name))
      })
    },
    generatorParams() {
      if (this.innerFormItems && this.innerFormItems.length !== 0) {
        return this.innerFormItems.reduce((pre, cur) => {
          pre[cur.name] = cur.value
          return pre
        }, {} as any)
      }
      return {}
    },
    resetParams() {
      this.innerFormItems && (this.innerFormItems.forEach(it => it.value === ''))
    }
  }
})

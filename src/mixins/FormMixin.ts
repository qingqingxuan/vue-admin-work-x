import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      innerFormItems: [] as Array<FormItem>
    }
  },
  methods: {
    refreshItems() {
      this.innerFormItems = [] as Array<FormItem>
      this.innerFormItems.push(...(this as any).formItems.map((it: FormItem) => ({ ...it })))
    },
    checkParams() {
      return this.innerFormItems.every(it => {
        return it.validator ? it.validator.call(this, it,
          this.innerFormItems.find((item: FormItem) => it.associatedOption === item.name)) : true
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
      this.refreshItems()
    }
  }
})

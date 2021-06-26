export default {
  methods: {
    getInstance(ele) {
      let instance = this.$echarts.getInstanceByDom(ele)
      if (!instance) {
        instance = this.$echarts.init(ele)
      }
      return instance
    }
  }
}

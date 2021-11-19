
export default function (): Record<string, any> {
  const likeSearchModel: LikeSearchModel = { conditionItems: null }
  const generatorSearchParams = () => {
    if (likeSearchModel.conditionItems && likeSearchModel.conditionItems.length > 0) {
      return likeSearchModel.conditionItems.reduce((pre: any, cur: any) => {
        pre[cur.name] = cur.value
        return pre
      }, {})
    }
    return {}
  }
  const getSearchParams = () => {
    let searchParams = generatorSearchParams()
    if (typeof likeSearchModel.extraParams === 'function') {
      searchParams = Object.assign(searchParams, likeSearchModel.extraParams())
    } else if (typeof likeSearchModel.extraParams === 'object') {
      searchParams = Object.assign(searchParams, likeSearchModel.extraParams)
    }
    return searchParams
  }
  const resetSearch = () => {
    likeSearchModel.conditionItems && likeSearchModel.conditionItems.forEach(it => { it.value = '' })
  }
  const hasSearchParams = () => {
    return likeSearchModel.conditionItems?.some(it => it.value !== '')
  }

  return {
    likeSearchModel,
    getSearchParams,
    resetSearch,
    hasSearchParams
  }
}

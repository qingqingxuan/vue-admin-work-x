import { post, get } from '@/api/http'
import dataTable from './DataTable'
import likeSearch from './LikeSearch'
import baseForm from './Form'
import createScript from './CreateScript'
import ecahrts from './Echarts'
import setting from '../setting'
import Emit from './Emit'

export function useSetting() {
  return setting
}

export function usePost() {
  return post
}

export function useGet() {
  return get
}

export function useDataTable() {
  return dataTable()
}

export function useLikeSearch() {
  return likeSearch()
}

export function useForm() {
  return baseForm()
}

export function useCreateScript(src: string) {
  return createScript(src)
}

export function useEcharts(dom: HTMLElement, theme?: string) {
  return ecahrts(dom, theme)
}

export function useEmit() {
  return Emit()
}
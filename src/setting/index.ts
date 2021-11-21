import packageInfo from '../../package.json'
const projectName = packageInfo.name
const version = packageInfo.version

const defaultSetting = JSON.parse(localStorage.getItem('sys_setting') || '{}')

export default Object.assign({
  projectName,
  version,
  primaryColor: '#409eff'
}, defaultSetting) as Setting
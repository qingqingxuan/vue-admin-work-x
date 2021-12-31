import packageInfo from '../../package.json'

export const primaryColors = [
  '#409eff',
  '#13C2C2',
  '#F5222D',
  '#722ED1',
  '#f7acbc',
  '#ef5b9c',
  '#bd6758',
  '#f47920',
  '#2e3a1f',
  '#b2d235',
  '#121a2a',
  '#6a6da9',
  '#867892',
  '#fcaf17',
  '#76becc',
  '#1b315e',
  '#b4532a',
  '#008792',
]

const projectName = packageInfo.name
const version = packageInfo.version

const defaultSetting = JSON.parse(localStorage.getItem('sys_setting') || '{}')

export default Object.assign(
  {
    projectName,
    version,
    primaryColor: '#409eff',
    layoutMode: 'ltr',
    theme: 'light',
  },
  defaultSetting
) as Setting

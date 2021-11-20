import packageInfo from '../../package.json'
const projectName = packageInfo.name
const version = packageInfo.version

export default {
  projectName,
  version
} as Setting
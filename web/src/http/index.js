import Vue from 'vue'
import { importAll } from '@/utils/importall.js'
import { isUndefined } from '@/utils/type.js'

const apiModules = importAll(require.context('./modules', true, /^\.\/([^\s]+)\.js$/))
//
let apis = {}
apiModules.forEach(({ camelModuleName, module }) => {
  console.log(camelModuleName,module,'camelModuleName')
  let moduleName = camelModuleName.split('/')
  moduleName.length > 1 ? (moduleName = moduleName[1]) : (moduleName = camelModuleName)
  var constModule = require('./modules/' + camelModuleName + '.js')
  // 这种方式通过 export const test=()=>{}
  if (isUndefined(apis[moduleName])) {
    apis[moduleName] = {}
  }
  Object.keys(constModule).forEach(c => {
    if (c !== 'default') {
      apis[moduleName][c] = constModule[c]
      apis[c] = constModule[c]
    }
  })
  // 这种方式通过export default {} 导出
  if (module) {
    Object.keys(module).forEach(key => {
      apis[moduleName][key] = module[key]
      apis[key] = module[key]
    })
  }
})
// api
Vue.prototype.$api = apis

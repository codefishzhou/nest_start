const fileNameRE = /^(\.\/)([^\s]+)\.js$/

/**
 *@return {moduleName:array,camelModuleName:string,module:(obj)module}
 * @param {require.context('./modules', false, /\.js$/)} modulesContext
 */
export function importAll (modulesContext) {
  // console.log(modulesContext.keys(),'modulesContext')
  return modulesContext.keys().map((modulesPath) => {
    const moduleName = modulesPath.match(
      fileNameRE
    )
    // console.log(modulesPath,'modulesPath',moduleName)
    return {
      moduleName,
      camelModuleName: moduleName[2].replace(
        /-(\w)/g,
        (_, c) => (c ? c.toUpperCase() : '')
      ),
      module: modulesContext(modulesPath).default
    }
  })
}

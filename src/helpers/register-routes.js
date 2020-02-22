const path = require('path')
const filterFiles = require('filter-files')
const isDir = require('is-directory')
const { flatten } = require('lodash')
const isRouteFile = fileName => /((routes)|(route))\.js$/.test(fileName)

/**
 * @method getRoutesFilesFromDirname
 * @param  {String}            dirName
 * @return {Array<String>}
 */
const getRoutesFilesFromDirname = dirName => {
  return filterFiles.sync(
    dirName,
    (fp, dir) => {
      if (isRouteFile(fp)) {
        return true
      }

      return isDir.sync(path.join(dir, fp))
    },
    true
  )
}

/**
 * @method loadRoutesByPath
 * @param  {String}           dirName
 * @return {Array<Function>}   array of routes
 */
const loadRoutesByPath = dirName => {
  const routes = getRoutesFilesFromDirname(dirName).map(require)

  return flatten(routes)
}

/**
 * @method registerRoutesByPath
 * @param  {server}      server  server
 * @param  {String}             dirName path routes
 */
const registerRoutesByPath = (server, dirName) => {
  const routes = loadRoutesByPath(dirName)

  routes.forEach(route => {
    const { method, action, path } = route
    const { middleware } = route

    middleware
      ? server[method](path, ...middleware, action)
      : server[method](path, action)
  })
}

module.exports = registerRoutesByPath
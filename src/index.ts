import * as ts from 'typescript'
import { bindNodeCallback, from } from 'rxjs'
import { filter, flatMap, map, tap } from 'rxjs/operators'
import glob from 'glob'
import js2coffee from 'js2coffee'

import { logHeader, logFile } from './logging'
import argv from './args'
import { read, write } from './fs'
import { File } from './interfaces'

/*    == GRAND TABLE OF EVERYTHING ==
 *
 * |      | Synchronous | Asynchronous |
 * | ---- | ----------- | ------------ |
 * | One  | variable    | Promise      |
 * | Many | Array       | Observable   |
 */

let find = bindNodeCallback<string, string[]>(glob)

let typeScriptCompile = ({ path, content }: File): File => ({
  path,
  content: ts.transpileModule(content, { }).outputText,
})

let rename = ({ path, content }: File): File => ({
  path: path.replace(/\.\w+$/, '.coffee'),
  content,
})

let toCoffeeScript = ({ content, path }: File): File => ({
  path,
  content: js2coffee.build(content).code,
})

let noDeclarations = (path: string): boolean => !path.endsWith('.d.ts')

logHeader()

find(argv.pattern)
  .pipe(flatMap(from))
  .pipe(filter(noDeclarations))
  .pipe(flatMap(read))
  .pipe(map(typeScriptCompile))
  .pipe(map(toCoffeeScript))
  .pipe(map(rename))
  .pipe(flatMap(write))
  .pipe(tap(logFile))
  .subscribe()

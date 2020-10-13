import * as fs from 'fs'
import { Observable, bindNodeCallback } from 'rxjs'
import { map } from 'rxjs/operators'

import { File } from './interfaces'

let readFile = bindNodeCallback<string, { encoding: 'utf-8' }, string>(
  fs.readFile
)

let writeFile = bindNodeCallback<string, string>(fs.writeFile)

export let read = (path: string): Observable<File> => {
  return readFile(path, { encoding: 'utf-8' })
    .pipe(map(content => ({ path, content })))
}

export let write = ({ path, content }: File): Observable<File> => {
  return writeFile(path, content)
    .pipe(map(() => ({ path, content })))
}


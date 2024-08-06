import fs from 'node:fs'
import process from 'node:process'

import Configstore from 'configstore'
import { name as pkgName } from '../package.json'
import type { ISetting } from './types'

export function storage(): Configstore {
  return new Configstore(pkgName)
}

export function checkDotGitFolder(): void {
  try {
    fs.accessSync('.git', fs.constants.F_OK)
  }
  catch (err: any) {
    console.error('❌ Error: It seems you are not in a git repository, please make sure you are in the right directory!', err)
    process.exit(0)
  }
}

export function formatLog(log: any): string {
  return JSON.stringify(log, null, 2)
}

export function globalMessage(message: string): void {
  if (message === 'User force closed the prompt with 0 null') {
    process.exit(0)
  }
  else {
    throw new Error(message)
  }
}

export function checkStorageSize(): void {
  if (storage().size === 0) {
    console.log('⚠️ Warning: No envs in local storage, please add one first!')
    process.exit(0)
  }
}

export function getAllEnvList(): Record<string, ISetting> {
  return storage().all
}

export function entriesEnvList(): Array<{ name: string, value: ISetting }> {
  const currentList = getAllEnvList()

  return Object
    .entries(currentList)
    .map(([name, value]) => ({
      name,
      value: {
        ...value,
        env: name,
      },
    }))
}

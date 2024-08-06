import process from 'node:process'
import { confirm, input, search } from '@inquirer/prompts'
import simpleGit from 'simple-git'
import {
  checkDotGitFolder,
  checkStorageSize,
  entriesEnvList,
  formatLog,
  getAllEnvList,
  globalMessage,
  storage,
} from '../helper'

export async function addEnv(): Promise<void> {
  try {
    const conf = storage()

    const env = await input({
      message: '⌨️ Enter your env：',
      required: true,
      default: 'github',
    })

    const userInfo = conf.get(env)

    if (userInfo) {
      const answer = await confirm({
        message: `⚠️ Warning: The env already exists: \n${formatLog(userInfo)}\nDo you want to overwrite it?`,
        default: false,
      })

      if (!answer) {
        process.exit(0)
      }
    }

    const username = await input({
      message: `⌨️ Enter your username in ${env}：`,
      required: true,
      default: userInfo?.username ?? '',
    })
    const email = await input({
      message: `⌨️ Enter your email in ${env}：`,
      required: true,
      default: userInfo?.email ?? '',
    })

    conf.set(env, { username, email })
    console.log(`✅ Execute 'set-git-user' to set your ${env} env successfully!`)
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function setEnv(): Promise<void> {
  try {
    checkDotGitFolder()
    checkStorageSize()

    const { env, email, username } = await search({
      message: '🤗 Select Env: ',
      source: async () => entriesEnvList(),
    })

    simpleGit()
      .addConfig('user.name', username)
      .addConfig('user.email', email)

    console.log(`✅ Set your '${env}' user config to local successfully!`)
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function searchEnv(): Promise<void> {
  try {
    checkStorageSize()

    const { username, email } = await search({
      message: '🤗 Select Env:',
      source: async () => entriesEnvList(),
    })

    console.log(formatLog({ username, email }))
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export function whereStorage(): void {
  console.log(storage().path)
}

export function outputList(): void {
  console.log(formatLog(getAllEnvList()))
}

export async function clearStorage(): Promise<void> {
  try {
    const sure = await confirm({
      message: '😲 Are you sure to clear all envs in local storage?',
      default: false,
    })

    if (sure) {
      storage().clear()
      console.log('✅ All envs in local storage have been cleared successfully!')
    }
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function deleteStorageKey(): Promise<void> {
  try {
    checkStorageSize()

    const { env } = await search({
      message: '🤔 Delete Env: ',
      source: async () => entriesEnvList(),
    })

    const sure = await confirm({
      message: `😲 Are you sure to delete '${env}' env in local storage?`,
      default: false,
    })

    if (sure) {
      storage().delete(env)
      console.log(`✅ The '${env}' env in local storage has been deleted successfully!`)
    }
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

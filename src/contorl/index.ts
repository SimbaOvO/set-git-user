import process from 'node:process'
import { confirm, input, search } from '@inquirer/prompts'
import simpleGit from 'simple-git'
import { checkDotGitFolder, checkStorageSize, formatLog, getAllEnvList, globalMessage, storage } from '../helper'

export async function addEnv(): Promise<void> {
  try {
    const conf = storage()
    const env = await input({
      message: 'Enter your env：',
      required: true,
      default: 'github',
    })

    await checkEnv(env)

    const username = await input({
      message: `Enter your username in ${env}：`,
      required: true,
    })
    const email = await input({
      message: `Enter your email in ${env}：`,
      required: true,
    })

    conf.set(env, { username, email })
    console.log(`Execute 'set-git-user' to set your ${env} env successfully!`)
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function setEnv(): Promise<void> {
  try {
    checkDotGitFolder()
    checkStorageSize()

    const currentList = getAllEnvList()

    const { env, email, username } = await search({
      message: 'Select Env: ',
      source: async (_) => {
        return Object.entries(currentList)
          .map(([name, value]) => ({
            name,
            value: {
              ...value,
              env: name,
            },
          }))
      },
    })

    simpleGit()
      .addConfig('user.name', username)
      .addConfig('user.email', email)

    console.log(`Set your '${env}' user config to local successfully!`)
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function checkEnv(env: string): Promise<void> {
  const conf = storage()

  if (conf.has(env)) {
    const userInfo = conf.get(env)
    const answer = await confirm({
      message: `⚠️ Warning: The env already exists: \n${formatLog(userInfo)}\nDo you want to overwrite it?`,
      default: false,
    })

    if (!answer) {
      process.exit(0)
    }
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
      message: 'Are you sure to clear all envs in local storage?',
      default: false,
    })

    if (sure) {
      storage().clear()
    }
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

export async function deleteStorageKey(): Promise<void> {
  try {
    checkStorageSize()

    const currentList = getAllEnvList()

    const { env } = await search({
      message: 'Which env do you want to delete? ',
      source: async (_) => {
        return Object.entries(currentList)
          .map(([name, value]) => ({
            name,
            value: {
              ...value,
              env: name,
            },
          }))
      },
    })

    const sure = await confirm({
      message: `Are you sure to delete '${env}' env in local storage?`,
      default: false,
    })

    if (sure) {
      storage().delete(env)
    }
  }
  catch (err: any) {
    globalMessage(err.message)
  }
}

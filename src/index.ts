#!/usr/bin/env node

import process from 'node:process'
import { addEnv, clearStorage, deleteStorageKey, outputList, setEnv, whereStorage } from './contorl'

const argv = process.argv.slice(2)

if (argv.length === 0) {
  setEnv()
}
else {
  switch (argv[0]) {
    case 'add':
      addEnv()
      break
    case 'list':
      outputList()
      break
    case 'delete':
      deleteStorageKey()
      break
    case 'where':
      whereStorage()
      break
    case 'clear':
      clearStorage()
      break
    default:
      break
  }
}

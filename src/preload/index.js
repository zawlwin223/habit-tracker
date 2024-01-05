import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import db from '../../db/stores/habitItem'

// Custom APIs for renderer
const api = {
  habit: {
    async getAll() {
      return db.getAll()
    },

    async getOne(_id) {
      return db.getOne(_id)
    },

    async create(data) {
      return db.create(data)
    },

    async rename(_id, name) {
      return db.rename(_id, name)
    },

    async deleteOne(_id) {
      return db.deleteOne(_id)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

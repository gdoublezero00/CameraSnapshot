import { app, BrowserWindow } from "electron"
import * as path from "path"
import * as isDev from 'electron-is-dev'
import server from './server'

let mainWindow: BrowserWindow | null = null

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}../index.html`)
    if (isDev) {
        mainWindow.webContents.openDevTools()
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
			forceHardReset: true,
			hardResetMethod: 'exit'
		})
    }
}

app.on('ready', () => {
    server.listen(3999)
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow()
    }
})

const { app, BrowserWindow, ipcMain } = require('electron');
const { is } = require('electron-util');
const path = require('path');
const TrayGenerator = require('./tray-generator');

let mainWindow = null;
const Store = require('electron-store');
const schema = {
  launchAtStart: true
}
const store = new Store(schema); null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#FFF',
    width: 420,
    height: 600,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      devTools: is.development,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (is.development) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL('http://localhost:8080');
    // mainWindow.loadURL(`file://${path.join(__dirname, '/public/index.html')}`);
  } else {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`file://${path.join(__dirname, '/public/index.html')}`);
  }
};

app.on('ready', () => {
  createMainWindow();
  const Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();

  ipcMain.on('update-title', (_, data) => {
    Tray.setTrayTitle(data);
  })
});

app.setLoginItemSettings({
  openAtLogin: store.get('launchAtStart'),
});

// app.dock.hide();

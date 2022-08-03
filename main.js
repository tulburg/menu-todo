const { app, BrowserWindow } = require('electron');
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
    }
  });
  if (is.development) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    mainWindow.loadURL('http://localhost:8080');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../../build/index.html')}`);
  }
};

app.on('ready', () => {
  createMainWindow();
  const Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();
});

app.setLoginItemSettings({
  openAtLogin: store.get('launchAtStart'),
});

// app.dock.hide();

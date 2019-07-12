import notifier from 'node-notifier'
import { app, remote } from 'electron'

let amountOfNotifications = 0

function getWindow () {
  return remote.getCurrentWindow()
}

export const resetAmountOfNotifications = () => {
  amountOfNotifications = 0
}

const sendNotify = (title, message) => {
  if (!getWindow()) {
    return
  }
  if (!getWindow().isFocused()) {
    amountOfNotifications++
    notifier.notify({ appID: 'org.develar.TFT-Wallet', title: title, message: message }, () => {
      getWindow().flashFrame(true)
    })
  }
  sendOverlay()
}

const createIcon = (text) => {
  const { nativeImage } = remote
  const canvas = createContext(text)
  var badgeDataURL = canvas.toDataURL()
  var img = nativeImage.createFromDataURL(badgeDataURL)
  return img
}

const createContext = (text) => {
  let canvas = document.createElement('canvas')
  canvas.height = 140
  canvas.width = 140
  let context = canvas.getContext('2d')
  context.fillStyle = 'red'
  context.ellipse(70, 70, 70, 70, 0, 0, 2 * Math.PI)
  context.fill()
  context.textAlign = 'center'
  context.fillStyle = 'white'
  context.font = '100px "Segoe UI", sans-serif'
  context.fillText('' + text, 70, 105)
  return canvas
}

const sendWindowsOverlay = () => {
  if (!getWindow()) {
    return
  }
  if (amountOfNotifications > 0) {
    getWindow().setOverlayIcon(createIcon(amountOfNotifications.toString()), amountOfNotifications.toString())
  } else {
    getWindow().setOverlayIcon(null, '')
  }
}

const sendUnixOverlay = () => {
  if (amountOfNotifications > 0) {
    app.dock.setBadge(createIcon(amountOfNotifications.toString()), amountOfNotifications.toString())
  } else {
    app.dock.setBadge(null, '')
  }
}

export const sendOverlay = () => {
  if (process.platform === 'darwin') {
    sendUnixOverlay()
  } else if (process.platform === 'win32') {
    sendWindowsOverlay()
  }
}

export const sendNotification = (title, message) => {
  sendNotify(title, message)
  sendOverlay()
}

import notifier from 'node-notifier'
import { remote } from 'electron'
// import { increaseNotificationCount, resetNotificationCount } from '../actions/index'

function getWindow () {
  return remote.getCurrentWindow()
}

export function resetAmountOfNotifications () {
  // store.dispatch(resetNotificationCount)
  // amountOfNotifications = 0
}

function sendNotify (title, message) {
  if (!getWindow()) return
  if (!getWindow().isFocused()) {
    // amountOfNotifications++
    sendOverlay(title, message)
  }
}

function createIcon (text) {
  const { nativeImage } = remote
  const badgeDataURL = createContext(text).toDataURL()
  return nativeImage.createFromDataURL(badgeDataURL)
}

function createContext (text) {
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

function sendWindowsOverlay (notifications) {
  console.log('---amountOfNotifications---', notifications)
  const amountOfNotifications = notifications.length
  if (!getWindow()) return
  if (amountOfNotifications > 0) {
    getWindow().setOverlayIcon(createIcon(amountOfNotifications.toString()), amountOfNotifications.toString())
    notifier.notify({ appID: 'org.develar.TFT-Wallet', title: '', message: '' }, () => {
      getWindow().flashFrame(true)
    })
  } else {
    getWindow().setOverlayIcon(null, '')
  }
}

function renderMacOverlay (notifications) {
  if (!remote) return
  console.log('---amountOfNotifications---', notifications)
  const amountOfNotifications = notifications.length
  if (amountOfNotifications > 0) {
    remote.app.dock.show()
    remote.app.dock.bounce('informational')
    // remote.app.dock.setBadgeCount(amountOfNotifications)
    remote.app.dock.setBadge(amountOfNotifications.toString())
  } else {
    // remote.app.dock.setBadgeCount(0)
    remote.app.dock.setBadge('')
  }
}

export function renderLinuxOverlay () {
  return null
}

export function sendOverlay (notifications) {
  switch (process.platform) {
    case 'darwin': renderMacOverlay(notifications)
      break
    case 'linux': renderLinuxOverlay(notifications)
      break
    case 'win32': sendWindowsOverlay(notifications)
      break
    default:
      return null
  }
}

export const customMiddleWare = store => next => action => {
  if (action.type === 'INCREASE_NOTIFICATION_COUNT') {
    sendOverlay(store.getState().notifications)
  }
  next(action)
}

export function sendNotification (title, message) {
  sendNotify(title, message)
  sendOverlay()
}

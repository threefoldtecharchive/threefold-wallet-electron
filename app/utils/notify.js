import notifier from 'node-notifier'
import { remote } from 'electron'
import { configureStore } from '../store/configureStore'
import { increaseNotificationCount, resetNotificationCount } from '../actions/index'

function getWindow () {
  return remote.getCurrentWindow()
}

export function resetAmountOfNotifications () {
  configureStore().dispatch(resetNotificationCount)
}

function sendNotify (title, message) {
  if (!getWindow()) return
  if (!getWindow().isFocused()) {
    console.log(configureStore().getState().notifications)

    configureStore().dispatch(increaseNotificationCount)
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

function sendWindowsOverlay (title, message) {
  if (!getWindow()) return
  const amountOfNotifications = configureStore().getState().notifications

  if (amountOfNotifications > 0) {
    getWindow().setOverlayIcon(createIcon(amountOfNotifications.toString()), amountOfNotifications.toString())
    notifier.notify({ appID: 'org.develar.TFT-Wallet', title: title, message: message }, () => {
      getWindow().flashFrame(true)
    })
  } else {
    getWindow().setOverlayIcon(null, '')
  }
}

function renderMacOverlay () {
  if (!remote) return
  const amountOfNotifications = configureStore().getState().notifications

  console.log('---amountOfNotifications---', amountOfNotifications)
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

export function sendOverlay (title, message) {
  switch (process.platform) {
    case 'darwin': renderMacOverlay()
      break
    case 'linux': renderLinuxOverlay()
      break
    case 'win32': sendWindowsOverlay(title, message)
      break
    default:
      return null
  }
}

export function sendNotification (title, message) {
  sendNotify(title, message)
  sendOverlay()
}

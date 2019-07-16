import notifier from 'node-notifier'
import { remote } from 'electron'
import { store } from '../store/configureStore'

remote.app.on('browser-window-focus', () => {
  resetAmountOfNotifications()
  getWindow().flashFrame(false)
  sendOverlay({ count: 0 })
})

remote.app.on('browser-window-blur', () => {
  resetAmountOfNotifications()
  getWindow().flashFrame(false)
  sendOverlay({ count: 0 })
})

function getWindow () {
  return remote.getCurrentWindow()
}

export function resetAmountOfNotifications () {
  store.dispatch({ type: 'RESET_NOTIFICATION_COUNT' })
}

export function sendOverlay () {
  const notifications = store.getState().notifications
  switch (process.platform) {
    case 'darwin': renderMacOverlay(notifications)
      break
    case 'win32': renderWindowsOverlay(notifications)
      break
    case 'linux': return null
    default:
      return null
  }
}

function renderWindowsOverlay (notifications) {
  if (!getWindow()) return
  if (notifications.count > 0 && !getWindow().isFocused()) {
    getWindow().setOverlayIcon(createIcon(notifications.count.toString()), notifications.count.toString())
    notifier.notify({ appID: 'org.develar.TFT-Wallet', title: notifications.title, message: notifications.message }, () => {
      getWindow().flashFrame(true)
    })
  } else {
    getWindow().setOverlayIcon(null, '')
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

function renderMacOverlay (notifications) {
  if (!remote) return
  if (notifications.count > 0) {
    remote.app.dock.show()
    remote.app.dock.bounce('informational')
    remote.app.dock.setBadge(notifications.count.toString())
  } else {
    remote.app.dock.setBadge('')
  }
}

export const customMiddleWare = store => next => action => {
  next(action)
  if (action.type === 'INCREASE_NOTIFICATION_COUNT') {
    sendOverlay(store.getState().notifications)
  }
}

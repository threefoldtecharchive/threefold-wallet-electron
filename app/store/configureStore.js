// @flow
import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev

export const { store } = selectedConfigureStore

export const { history } = selectedConfigureStore

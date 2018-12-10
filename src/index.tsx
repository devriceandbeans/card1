import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import configureStore from './configureStore'
import CardComponent from './card1'

const initialState = window.initialReduxState
const store = configureStore(initialState)

ReactDOM.render(<Provider store={store}><CardComponent /></Provider>, document.getElementById('root'))

serviceWorker.unregister()
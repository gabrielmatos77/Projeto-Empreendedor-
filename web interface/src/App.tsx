import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { Login } from './components/login/login'
import { SingIn } from './components/login/singIn'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

function App() {

  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<></>} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/singIn'} element={<SingIn />} />
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path='/main' element={<></>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

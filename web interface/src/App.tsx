import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { Login } from './components/login/login'
import { SingIn } from './components/login/singIn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Main } from './components/main/main'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
})

const queryclient = new QueryClient()

function App() {

  return (
    <AuthProvider store={store}>
      <QueryClientProvider client={queryclient}>
        <BrowserRouter>
          <Routes>
            <Route path='/main/*' element={<Main />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/singIn'} element={<SingIn />} />
            <Route element={<AuthOutlet fallbackPath='/login' />}>
              <Route path='/' element={<Main />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './global.css';
import { store } from './store';
import { Provider } from 'react-redux';
import Signin from './components/Signin';
import Root from './routes/Root';
import Home from './routes/Home';
import Profile from './routes/Profile';

const checkAuth = (isSigning: boolean) => {
  const token = localStorage.getItem('token');
  if (token && isSigning) return redirect('/');

  if (token && !isSigning) {
    const tokenTime = localStorage.getItem('tokenTime');
    const currentDate = new Date().getTime();
    const prevDate = Number(new Date(Number(tokenTime)));
    const daysPassed = Math.floor(
      (currentDate - prevDate) / (1000 * 60 * 60 * 24)
    );
    if (daysPassed >= 29) {
      localStorage.clear();
      return redirect('/signin');
    }
  }
  if (!token && !isSigning) return redirect('/signin');
  return 0;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home />, loader: () => checkAuth(false) },
      {
        path: '/:userName',
        element: <Profile />,
        loader: () => checkAuth(false),
      },
    ],
  },
  {
    path: '/signin',
    element: <Signin />,
    loader: () => checkAuth(true),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

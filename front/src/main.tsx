import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Root from './routes/Root';
import './global.css';
import { store } from './store';
import { Provider } from 'react-redux';
import Signin from './components/Signin';

const checkAuth = (isSigning: boolean) => {
  const token = localStorage.getItem('token');
  if (token && isSigning) return redirect('/');
  if (!token && !isSigning) return redirect('/signin');
  return 0;
};

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Root />, loader: () => checkAuth(false) },
      {
        path: '/signin',
        element: <Signin />,
        loader: () => checkAuth(true),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

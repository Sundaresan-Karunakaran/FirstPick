import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react';

import { client } from './graphql/client.js' 
import './index.css'
import App from './App.jsx'
import HeroPage from './HeroPage.jsx'
import Header from './assets/Header.jsx'
import HeroListPage from './HeroListPage.jsx';
import AboutPage from './About.jsx';


const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/hero/:heroID/:heroName', element: <HeroPage />},
  {path: '/heroes', element: <HeroListPage />},
  {path: '/about', element: <AboutPage />}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)

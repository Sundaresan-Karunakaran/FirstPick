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
import DotaSVG from '../public/dota.svg'
import { useEffect, useState } from 'react';

function DesktopOnly({ children }) {
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <main className="desktopOnlyMessage">
        <div>
          <div style={{fontSize:'50px', fontFamily:'cinzel'}}>FIRSTPICK </div>
          <div className="smallHeaderText">Draft better in Dota</div>
        </div>
        Please view in a desktop
      </main>
    );
  }

  return children;
}

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/hero/:heroID/:heroName', element: <HeroPage />},
  {path: '/heroes', element: <HeroListPage />},
  {path: '/about', element: <AboutPage />}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <DesktopOnly>
      <RouterProvider router={router} />
      </DesktopOnly>
    </ApolloProvider>
  </StrictMode>,
)

import './App.css'

import ErrorComp from './AppLayout/ErrorComp';
import Layout from './AppLayout/Layout'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import HospitalsPartners from './pages/HospitalsPartners';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MedicalBoardPage from './pages/MedicalBoardPage';
import NewsArticles from './pages/NewsArticles';
import ContactUs from './pages/ContactUs';



export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      errorElement: <ErrorComp/>,
      children: [
        {
          path: '/',
          element: <Home /> 
        },
        {
          path: '/about',
          element: <About/>
        },
        {
          path: '/partners',
          element: <HospitalsPartners />
        },
        {
          path: '/medical-board',
          element: <MedicalBoardPage />
        },
        {
          path: '/news-articles',
          element: <NewsArticles />
        },
        {
          path: '/contact',
          element: <ContactUs />
        },

      ]
    },

  ]);
  return (<RouterProvider 
    router={router} future={{v7_startTransition: true, }} 
  />

) 
}
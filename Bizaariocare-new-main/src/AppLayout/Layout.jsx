import React from 'react'

import Footer from './Footer';
import { Outlet, useNavigation } from 'react-router';
import Header from './Header';

// import Header from './Header'
// import Footer from './Footer';

const Layout = () => {
    const loadingNavigation= useNavigation();
    if(loadingNavigation.state=== 'loading'){
      return(<Loading/>)
    }

  return (
    <>
      <Header /> 
  
    <Outlet/>    
    <Footer/>
</>
  )
}

export default Layout
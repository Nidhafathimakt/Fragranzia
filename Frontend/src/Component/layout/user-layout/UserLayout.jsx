import React from 'react'
import Header from '../../user/Header';
import Footer from '../../user/Footer';


function UserLayout({children}) {
  return (
    <div>
   <Header/>
   {children}
   <Footer/>
   </div>
  )
}

export default UserLayout
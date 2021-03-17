import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';

import { Helmet } from 'react-helmet-async';

import 'bootswatch/dist/lux/bootstrap.css'

const Layout = ({title, description, children, hideElements}) => {
    return ( 
        <div className="d-flex flex-column min-vh-100">
        <Helmet>
            <title>{ title }</title>
            <meta name = "description" content={ description || "Fab Insta Marketing" } />
        </Helmet>
        <Header hideElements={hideElements}/>
        <main className="container">
            {children}
        </main>
        <Footer/>
        </div>
     );
}
 
export default Layout;
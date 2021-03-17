import React from 'react';
import Layout from '../../components/Layout';

import ProductsGrid from './ProductsGrid';

const Store = () => {
    
    return ( 
        <Layout title="Fab Insta" description="This is the Store page" >
            <div>
                <div className="text-center mt-5">
                    <h1>FAB INSTA MARTKETING</h1>
                    <p>Welcome to Fab Insta marketing.</p>
                </div>
                <ProductsGrid/>
            </div>
        </Layout>
     );
}
 
export default Store;
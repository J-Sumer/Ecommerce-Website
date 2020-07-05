import React from 'react';
import Layout from './Layout'
import { API } from '../config'

const Home = () => {
    return(
        <Layout title="Home page" description="Node React E-Commerce App">
            {API}
        </Layout>
    )
}

export default Home
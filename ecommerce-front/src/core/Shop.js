import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import { getCategories, getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './FixedPrices'
import RadioBox from './RadioBox'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price:[]}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    const [size, setSize] = useState(0)
    
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            }else {
                setCategories(data)
            }
        })
    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            }else {                
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            }else {                
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size >0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-dark mb-5 btn-block">Load more...</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(myFilters.filters)
    },[])

    const handleFilters = (filters, filterBy) => {
        // console.log('Shop', filters, filterBy)
        const newFilters = {...myFilters}
        // this logic is to get the array instead of _id from the prices object
        if(filterBy === 'price'){
            newFilters.filters.price = prices[filters].array
        }else{
            newFilters.filters[filterBy] = filters
        }        
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    return(
        <Layout title="Shop page" description="Search and find books of your choice" className="container-fluid">
            <div className="row">
                <div className="col-4">
                <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>                      
                <h4>Filter by price range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>                      
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product,i) => (
                            <div key={i} className="mb-3 col-4">
                                <Card product={product}/>
                            </div>
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>            
        </Layout>
    )
}

export default Shop
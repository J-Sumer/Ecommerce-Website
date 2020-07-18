import React, {useState, useEffect} from 'react';
import Layout from './Layout'
import { getProducts, read, listRelated } from './apiCore'
import Card from './Card'


const Product = (props) => {
    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct] = useState([])
    const [error,setError] = useState(false)

    const loadSingleProdcut = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })

    }

    // ***  here in related products place when we get all the related products
    // when we click on view product from those cards, url will chhange but the contents will not change
    // this is because we have used useEffect and it runs only once if we dont give anything as second parameter
    // when new request comes from the related products card, this page has already been loaded
    // useEffect is used already once.  

    // therefore in the second parameter we have given props.  Now when new request comes, props will get changed and 
    // page renders again
    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProdcut(productId)
    },[props])

    return(
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,50)} className="container-fluid">
            <div className="row">
                <div className="col-9">
                    {product && product.description && <Card product={product} showViewProductButton={false}/>}
                </div>
                <div className="col-3">
                    <h4>Related products</h4>
                    {relatedProduct.map((p,i) => (
                        <div className="mb-3">
                            <Card key={i} product={p}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Product
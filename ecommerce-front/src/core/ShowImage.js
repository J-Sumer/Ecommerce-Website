import React from 'react'
import {API} from '../config'


const ShowImage = ({item,url}) => (
    <div className="product-img" style={{ width: "100%"}}>
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{ width: "50%", marginLeft: "25%"}}/>
    </div>
)

export default ShowImage
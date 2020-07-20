import {API} from '../config'

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

// To perform crud on products


export const getProducts = (userId, token) => {
    return fetch(`${API}/products`, {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const getProduct = (productId) => {
    // here we are giving undefined. that is because in back end we are limiting to 6, if we are not passing anything it will give only 6 values by default
    return fetch(`${API}/product/${productId}?limit=undefined`, {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            // since we are giving form data we should not give application/json as "Content-Type"
            //"Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        // here we are not using JSON.stringify, since product is form data and it will have image
        body: product
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err)
    })
}
const {Order, CartItem} = require('../models/order')
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
    .populate('products.product', "name price")
    .exec((error, order) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        req.order = order
        next();
    })
}

exports.updateOrderStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, 
                 {$set: {status: req.body.status}},
                 (error, order) => {
                    if(error) {
                        return res.status(400).json({
                            error: errorHandler(error)
                        })
                    }
                    res.json(order)
                 } 
                )
}

exports.create = (req, res) => {
    console.log("create order", req.body)

    req.body.user = req.profile
    const order = new Order(req.body)
    console.log(req.body)
    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })

}

// *************
// there should not be any , in populate ("_id, name, address") is wrong
exports.listOrders = (req, res) => {
    Order.find()
    .populate('user', "_id name address")
    .sort('createdAt')
    .exec((error, orders) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders)
    })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}
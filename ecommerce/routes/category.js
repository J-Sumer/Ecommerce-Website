const express = require('express')
const router = express.Router()

const { create, categoryId, read, update, remove, list } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post('/category/create/:userId', requireSignin, isAuth,isAdmin  ,create )
router.put('/category/:categoryId/:userId', requireSignin, isAuth,isAdmin  ,update )
router.delete('/category/:categoryId/:userId', requireSignin, isAuth,isAdmin  ,remove )
router.get('/category/:categoryId', read)
router.get('/categories', list)

router.param("userId", userById)
router.param("categoryId", categoryId)

module.exports = router
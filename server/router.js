const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")(process.env.SECRET)


router.post("/api/payment", (req, res) => {
    const { product, token } = req.body
    console.log("PRODUCT", product)
    console.log("PRICE", product.price)
    const idempontencykey = uuidv4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charge.create({
            amount: product.price * 100,
            currecny: 'gpd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country,
                }
            }

        }, { idempontencykey })
    }).then(result => res.status(200).json(result))
        .catch(err => console.log("yoo this is a problem ", err))

})





module.exports = router
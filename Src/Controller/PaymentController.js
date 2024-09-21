const stripe = require("stripe")(process.env.PAYMENT_SECREAT);
const express = require('express');
const client = require("../Config/DB_Config");
const { ObjectId } = require("mongodb");
const router = express.Router();
const PaymentData = client.db('GalaxyTech').collection('PaymentData');
const createPayment = async (req, res) => {
    const { Price } = req.body;
    const amount = Price * 100;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: "Error creating payment intent" });
    }
};

const SavePaymentData=async(req,res)=>{
    const newPayment = req.body;
    const result = await PaymentData.insertOne(newPayment)
    res.send(result)
}

router.post('/save',SavePaymentData)
router.patch('/update/:collection/:productId', async (req, res) => {
    const { collection, productId } = req.params;
    const { updateValue } = req.body;
    console.log(collection,productId,updateValue)

    try {
        const database = client.db('GalaxyTech');
        const selectedCollection = database.collection(collection);
        const filter = { _id: new ObjectId(productId) };
        const options = { upsert: true };
        const updateClass = {
            $set: {
                quantity: updateValue,
            }
        };
        
        // Use the updateOne method and check the result
        const result = await selectedCollection.updateOne(filter, updateClass, options);
        
        console.log(result);
        res.send(result);

        // // Check if the update was successful
        // if (result.modifiedCount > 0) {
        //     res.send({ success: true });
        // } else {
        //     res.send({ success: false });
        // }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post("/", createPayment);




module.exports = router;

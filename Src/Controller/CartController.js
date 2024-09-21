const client = require("../Config/DB_Config");
const { ObjectId } = require("mongodb");
const Cart = client.db('GalaxyTech').collection('Cart');


const deleteFromCart = async (req, res) => {
    const id = req.params.id; // Access the ID from the URL parameters
    const query = { _id: new ObjectId(id) };

    try {
        const result = await Cart.deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addToCart = async (req, res) => {
    const newItem = req.body;
    const result = await Cart.insertOne(newItem)
    res.send(result)
}

const getCart = async (req, res) => {
    try {
        const query = req.query;
        const Data = await Cart.find(query).toArray();
        res.json(Data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { addToCart, getCart, deleteFromCart }
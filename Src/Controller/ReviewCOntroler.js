
const client = require("../Config/DB_Config");
const Review = client.db('GalaxyTech').collection('reviews');

const getAllReview = async (req, res) => {
    try {
        const query = req.query;
        console.log(query)
        const Opinion = await Review.find(query).toArray();
        res.json(Opinion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}

const createReview = async (req, res) => {
    const NewReview = req.body;
    const result = await Review.insertOne(NewReview)
    res.send(result)
}

module.exports = { getAllReview, createReview }
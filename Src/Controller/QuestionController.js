const { ObjectId } = require("mongodb");
const client = require("../Config/DB_Config");
const Question = client.db('GalaxyTech').collection('Questions');

const getAllQuestion = async (req, res) => {
    try {
        const query = req.query;
        
    console.log(query)
        const questions = await Question.find(query).toArray();
    
        res.json(questions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const createQuestion = async (req, res) => {
    const newQNA = req.body;
    const result = await Question.insertOne(newQNA)
    res.send(result)
}

module.exports = { getAllQuestion, createQuestion }
const client = require("../Config/DB_Config");
const User = client.db('GalaxyTech').collection('user');


const SaveUser = async (req, res) => {
    const item = req.body
    const query = { email: item.email }
    const existUser = await User.findOne(query)
    console.log('Received POST request to /user', req.body);
    if (existUser) {
console.log('This user is already exists')
        return res.send({ message: 'This user is already exists',code:255 })
    }
    const result = await User.insertOne(item);
    res.send(result)
}
const GetUser=async (req, res) => {
    const cursor = User.find();
    const result = await cursor.toArray();
    res.send(result)
}

module.exports = {SaveUser,GetUser};
  
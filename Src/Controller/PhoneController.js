const { ObjectId } = require("mongodb");
const client = require("../Config/DB_Config");
const Phone = client.db('GalaxyTech').collection('Phone');



const getAllPhone = async (req, res, next) => {
  try {
    console.log('all is accessing')
    const allPhones = await Phone.find({}).toArray();
    res.json(allPhones);
  } catch (error) {
    next(error);
  }
};

const getByBrand = async (req, res) => {
    try {
      const { brand } = req.params;
      const Phones = await Phone.find({ 'keyFeatures.brand': { $regex: brand, $options: 'i' } }).toArray();
      res.json(Phones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getSinglePhoneData=async(req,res)=>{
  const {id}=req.params;
  console.log(id)
  const query = {_id: new ObjectId(id)}
  try {
    const data = await Phone.findOne(query);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while fetching the Phone data.' });
  }
}

module.exports = { getAllPhone, getByBrand ,getSinglePhoneData};

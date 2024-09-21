const { ObjectId } = require("mongodb");
const client = require("../Config/DB_Config");
const Laptop = client.db('GalaxyTech').collection('Laptop');


const getrelated = async (req, res, next) => {
  try {

    const laptops = await Laptop.find({}).toArray();

    const shuffledLaptops = laptops.sort(() => Math.random() - 0.5);

    const randomLaptops = shuffledLaptops.slice(0, 5);

    res.json(randomLaptops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllperpousLaptop = async (req, res) => {
  try {
    const laptops = await Laptop.find({}).toArray();

    const selectedProcessor = (req.query['Processor'] || "all").toLowerCase();
    const selectedGPU = (req.query['Graphics'] || "all").toLowerCase();
    const selectedCores = req.query['core'] ? req.query['core'].split(',') : [];
    const selectedBrand = (req.query['Brand'] || "all").toLowerCase();
    const Price = parseInt(req.query['price'] || 50000);
    const Sortby = req.query["sortBy"] || "default";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const Processor = selectedProcessor.split(',');
    const GPU = selectedGPU.split(',');

    const FilteredLaptop = laptops.filter((item) =>
      (selectedProcessor === "all" || Processor.includes(item.processor?.brand.toLowerCase())) &&
      (selectedGPU === "all" || GPU.includes(item.graphics?.brand.toLowerCase())) &&
      (selectedBrand === "all" || selectedBrand.includes(item.keyFeatures?.brand.toLowerCase())) &&
      (selectedCores.length === 0 || selectedCores.includes(item.processor?.core.toString())) &&
      item.keyFeatures.discountedPrice <= Price
    );

    const sortFunction = (a, b) => {
      if (Sortby === "discountAsc") {
        return a.keyFeatures.discountedPrice - b.keyFeatures.discountedPrice;
      } else if (Sortby === "discountDesc") {
        return b.keyFeatures.discountedPrice - a.keyFeatures.discountedPrice;
      } else {
        return 0;
      }
    };

    const SortedLaptop = FilteredLaptop.sort(sortFunction);
    const renderedArray = SortedLaptop.slice(skip, skip + limit);

    const discountPrices = laptops.map((item) => item.keyFeatures.discountedPrice);
    const minDiscountPrice = Math.min(...discountPrices);
    const maxDiscountPrice = Math.max(...discountPrices);

    // console.log('total renderable item : ', renderedArray.length);
    // console.log('total Filtered item : ', FilteredLaptop.length);

    res.send({ minDiscountPrice, maxDiscountPrice, totalpage: Math.ceil(FilteredLaptop.length / limit), laptops: renderedArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the Laptop data.' });
  }
};

const getSingleLaptopData = async (req, res) => {
  const { id } = req.params;

  const query = { _id: new ObjectId(id) }
  try {
    const data = await Laptop.findOne(query);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while fetching the laptop data.' });
  }
}

module.exports = { getSingleLaptopData, getrelated, getAllperpousLaptop };

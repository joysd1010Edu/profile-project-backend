const { ObjectId } = require("mongodb");
const client = require("../Config/DB_Config");
const GPU = client.db("GalaxyTech").collection("GraphicsCard");



const getRelatedGPU = async (req, res, next) => {
  try {
    const GpuCards = await GPU.find({}).toArray();
    const shuffledGPU = GpuCards.sort(() => Math.random() - 0.5);
    const randomGPU = shuffledGPU.slice(0, 5);
    console.log("Serving GPUs number : ", randomGPU.length)
    res.json(randomGPU);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPerposeGpu = async (req, res) => {
  try {
    const GPUs = await GPU.find({}).toArray();

    const selectedChip = (req.query['chip'] || "all").toLowerCase();
    const selectedMemorySize = req.query['size'] ? req.query['size'].split(',') : [];
    const selectedMemoryType = req.query['type'] ? req.query['type'].split(',') : [];
    const selectedBrand = (req.query['Brand'] || "all").toLowerCase();
    const Price = parseInt(req.query['price'] || 50000);
    const Sortby = req.query["sortBy"] || "default";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    // console.log(selectedMemoryType)
    // const Chips = selectedChip;
    // const MemorySize = selectedMemorySize.split(',');

    const FilteredGPU = GPUs.filter((item) =>
      (selectedChip === "all" || item.keyFeatures?.chipset?.toLowerCase().startsWith(selectedChip))
      && (selectedMemorySize.length === 0 || selectedMemorySize.includes(item?.keyFeatures?.memorySize?.toString()))
      && (selectedBrand === "all" || selectedBrand.includes(item.keyFeatures?.brandName?.toLowerCase()))
      && (selectedMemoryType.length === 0 || selectedMemoryType.includes(item?.keyFeatures?.memoryType?.toString()))
      && item.keyFeatures.price.discount <= Price
    );

    console.log(FilteredGPU.length)
    const sortFunction = (a, b) => {
      if (Sortby === "discountAsc") {
        return a.keyFeatures.price.discount - b.keyFeatures.price.discount;
      } else if (Sortby === "discountDesc") {
        return b.keyFeatures.price.discount - a.keyFeatures.price.discount;
      } else {
        return 0;
      }
    };

    const SortedGPU = FilteredGPU.sort(sortFunction);
    console.log(SortedGPU.length)
    const renderedArray = SortedGPU.slice(skip, skip + limit);

    const discountPrices = GPUs.map((item) => item.keyFeatures.price.discount);
    const minDiscountPrice = Math.min(...discountPrices);
    const maxDiscountPrice = Math.max(...discountPrices);

    console.log('total renderable item : ', renderedArray.length);
    console.log('total Filtered item : ', FilteredGPU.length);

    res.send({ minDiscountPrice, maxDiscountPrice, totalpage: Math.ceil(FilteredGPU.length / limit), GPUs: renderedArray });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the GPU data.' });
  }
};



const getSingleGPUData = async (req, res) => {
  const { id } = req.params;

  const query = { _id: new ObjectId(id) };
  try {
    const data = await GPU.findOne(query);
    res.send(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the GPU data." });
  }
};

module.exports = {
  getSingleGPUData, getRelatedGPU, getAllPerposeGpu

};

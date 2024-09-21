const { ObjectId } = require("mongodb");
process.setMaxListeners(12); // Increase the limit to 12

const client = require("../Config/DB_Config");
// ---------------------------------------defining  the collection-------------------------
const Processor = client.db('GalaxyTech').collection('Processor');
const HDD = client.db('GalaxyTech').collection('HDD');
const SSD = client.db('GalaxyTech').collection('SSD');
const Ram = client.db('GalaxyTech').collection('Ram');
const Motherboard = client.db('GalaxyTech').collection('Motherboard');
const PSU = client.db('GalaxyTech').collection('PSU');
const GraphicsCard = client.db('GalaxyTech').collection('GraphicsCard');
const Casing = client.db('GalaxyTech').collection('Casing');
const CasingCooler = client.db('GalaxyTech').collection('CasingCooler');
const CPU_Cooler = client.db('GalaxyTech').collection('CPU_Cooler');
let componentItem = []

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
}
const getFeaturedProducts = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const collections = [
      { name: 'Processor', collection: Processor },
      { name: 'HDD', collection: HDD },
      { name: 'SSD', collection: SSD },
      { name: 'CPU_Cooler', collection: CPU_Cooler },
      { name: 'CasingCooler', collection: CasingCooler },
      { name: 'Casing', collection: Casing },
      { name: 'GraphicsCard', collection: GraphicsCard },
      { name: 'Motherboard', collection: Motherboard },
      { name: 'Ram', collection: Ram },
      { name: 'PSU', collection: PSU },
      // Add more collections as needed
    ];

    // Define the fields you want to search across
    const searchFields = [
      'keyFeatures.modelName',
      'keyFeatures.name',
      'keyFeatures.chipset',
      'keyFeatures.brand',
      'keyFeatures.brandName',
      'name',
      'modelName',
      'brand',
      'brandName',
      'key.name',
      'key.brand',
      'key.modelName',
    ];

    // Construct a regex pattern for case-insensitive search
    const regexPattern = new RegExp(escapeRegExp(searchQuery), 'i');

    // Create a dynamic $or stage for each field
    const orStages = searchFields.map(field => ({ [field]: regexPattern }));

    // Create an array to store the results
    let searchResults = [];

    // Iterate through collections and execute aggregation
    for (let i = 0; i < collections.length; i++) {
      const result = await collections[i].collection.aggregate([
        { $match: { $or: orStages } },
        // Add more stages as needed
      ]).toArray();

      // Add collection name to each result
      const resultsWithCollectionName = result.map(item => ({
        collection: collections[i].name,
        data: item,
      }));

      searchResults = [...searchResults, ...resultsWithCollectionName];
    }

    res.json({ searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during the search.' });
  }
};




const Router = async (req, res) => {
  const { component } = req.params;

  try {
    switch (component) {
      case 'Motherboard':
        await getMotherboard(req, res);
        break;
      case 'HDD':
        await getHDD(req, res);
        break;
      case 'SSD':
        await getSSD(req, res);
        break;
      case 'Ram':
        await getRam(req, res);
        break;
      case 'PSU':
        await getPSU(req, res);
        break;
      case 'GraphicsCard':
        await getGraphicsCard(req, res);
        break;
      case 'Casing':
        await getCasing(req, res);
        break;
      case 'CasingCooler':
        await getCasingCooler(req, res);
        break;
      case 'CpuCooler':
        await getCPUCooler(req, res);
        break;
      case 'Processor':
        await getProcessors(req, res);
        break;
      default:
        res.status(404).json({ error: 'Component not found' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProcessor = await Processor.find({}).toArray();
    const allHDD = await HDD.find({}).toArray();
    const allSSD = await SSD.find({}).toArray();
    const allCPU_Cooler = await CPU_Cooler.find({}).toArray();
    const allCasingCooler = await CasingCooler.find({}).toArray();
    const allCasing = await Casing.find({}).toArray();
    const allGraphicsCard = await GraphicsCard.find({}).toArray();
    const allMotherboard = await Motherboard.find({}).toArray();
    const allRam = await Ram.find({}).toArray();
    const allPSU = await PSU.find({}).toArray();

    const componentItem = [
      ...allProcessor,
      ...allHDD,
      ...allSSD,
      ...allCPU_Cooler,
      ...allCasingCooler,
      ...allCasing,
      ...allGraphicsCard,
      ...allMotherboard,
      ...allRam,
      ...allPSU,
    ];

    res.json(componentItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching processors' });
  }
};

const getSingleProducts = async (req, res) => {
  const { id } = req.params;

  try {
    // Combine data from different collections into a single array
    const allProcessor = await Processor.find({}).toArray();
    const allHDD = await HDD.find({}).toArray();
    const allSSD = await SSD.find({}).toArray();
    const allCPU_Cooler = await CPU_Cooler.find({}).toArray();
    const allCasingCooler = await CasingCooler.find({}).toArray();
    const allCasing = await Casing.find({}).toArray();
    const allGraphicsCard = await GraphicsCard.find({}).toArray();
    const allMotherboard = await Motherboard.find({}).toArray();
    const allRam = await Ram.find({}).toArray();
    const allPSU = await PSU.find({}).toArray();

    const componentItem = [
      ...allProcessor,
      ...allHDD,
      ...allSSD,
      ...allCPU_Cooler,
      ...allCasingCooler,
      ...allCasing,
      ...allGraphicsCard,
      ...allMotherboard,
      ...allRam,
      ...allPSU,
    ];

    // Find the product in the combined array using its ID
    const product = componentItem.find(item => item._id.toString() === id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
};




const getMotherboard = async (req, res) => {
  try {
    const allMotherboard = await Motherboard.find({}).toArray();
    res.json(allMotherboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching motherboards' });
  }
};

const getHDD = async (req, res) => {
  try {
    const allHDD = await HDD.find({}).toArray();
    res.json(allHDD);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching HDDs' });
  }
};

const getSSD = async (req, res) => {
  try {
    const allSSD = await SSD.find({}).toArray();
    res.json(allSSD);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching SSDs' });
  }
};

const getRam = async (req, res) => {
  try {
    const allRam = await Ram.find({}).toArray();
    res.json(allRam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching RAMs' });
  }
};
const getRamByBrand = async (req, res) => {
  try {
    const { brand } = req.params;

    const GPUs = await Ram.find({
      "keyFeatures.brand": { $regex: brand, $options: "i" },
    }).toArray();
    res.json(GPUs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getPSU = async (req, res) => {
  try {
    const allPSU = await PSU.find({}).toArray();
    res.json(allPSU);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching PSUs' });
  }
};

const getGraphicsCard = async (req, res) => {
  try {
    const allGraphicsCard = await GraphicsCard.find({}).toArray();
    res.json(allGraphicsCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching graphics cards' });
  }
};

const getCasing = async (req, res) => {
  try {
    const allCasing = await Casing.find({}).toArray();
    res.json(allCasing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching casings' });
  }
};

const getCasingCooler = async (req, res) => {
  try {
    const allCasingCooler = await CasingCooler.find({}).toArray();
    res.json(allCasingCooler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching casing coolers' });
  }
};

const getCPUCooler = async (req, res) => {
  try {
    const allCPUCooler = await CPU_Cooler.find({}).toArray();
    res.json(allCPUCooler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching CPU coolers' });
  }
};
const getProcessors = async (req, res) => {
  try {
    const allProcessor = await Processor.find({}).toArray();
    res.json(allProcessor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching CPU coolers' });
  }
};




module.exports = {
  getFeaturedProducts, getSingleProducts,
  getAllProducts,
  getMotherboard,
  getHDD,
  getSSD,
  getRam,
  getPSU,
  getGraphicsCard,
  getCasing,
  getCasingCooler,
  getCPUCooler,
  getProcessors, getRamByBrand,
  Router
};
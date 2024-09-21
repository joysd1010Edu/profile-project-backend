const { ObjectId } = require("mongodb");
const client = require("../Config/DB_Config");
const Monitor = client.db('GalaxyTech').collection('Monitor');

const GetAllPrepousMonitor = async (req, res) => {
  try {
    const monitors = await Monitor.find({}).toArray();
    const selectedRefreshRatesString = (req.query['display.refreshRate'] || "all").toLowerCase();
    const selectedDisplayType = (req.query['display.type'] || "all").toLowerCase();
    const selectedResolution = (req.query['display.resolution'] || "all").toLowerCase();
    const selectedBrand = (req.query['key.brand'] || "all").toLowerCase();
    const Price = (req.query['price'] || 5000);
    const Sortby=req.query["sortBy"]||"default";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const refreshRatesArray = selectedRefreshRatesString.split(',');
    const DisplayTypeArray = selectedDisplayType.split(',');
    const resolutionArray = selectedResolution.split(',');
   
    const filteredMonitors = monitors.filter((item) =>
      (selectedRefreshRatesString === "all" || refreshRatesArray.includes(item.display?.refreshRate.toLowerCase())) &&
      (selectedDisplayType === "all" || DisplayTypeArray.includes(item.display?.type.toLowerCase())) &&
      (selectedBrand === "all" || selectedBrand.includes(item.key?.brand.toLowerCase())) &&
      (selectedResolution === "all" || resolutionArray.includes(item.display?.resolution)) &&
      item.key.price.discount <= Price )

      const sortFunction = (a, b) => {
        
        if (Sortby === "discountAsc") {
          return a.key.price.discount - b.key.price.discount;
        } else if (Sortby === "discountDesc") {
          return b.key.price.discount - a.key.price.discount;
        } else {
          
          return 0;
        }
      };
  
      const sortedMonitors = filteredMonitors.sort(sortFunction);
  
      const renderedArray = sortedMonitors.slice(skip, skip + limit);
     
    const discountPrices = monitors.map((item) => item.key.price.discount);
    const minDiscountPrice = Math.min(...discountPrices);
    const maxDiscountPrice = Math.max(...discountPrices);
    res.send({ minDiscountPrice, maxDiscountPrice,totalpage:Math.ceil(filteredMonitors.length / 12), monitors: renderedArray });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the Monitor data.' });
  }
};


const getSingleMonitorData = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const query = { _id: new ObjectId(id) }
  try {
    const data = await Monitor.findOne(query);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while fetching the Monitor data.' });
  }
}

module.exports = {  getSingleMonitorData, GetAllPrepousMonitor };

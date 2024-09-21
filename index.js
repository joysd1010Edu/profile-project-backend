//--------------------------------------importing  required modules-------------------------------
const express = require('express');
const cors = require('cors');
const client = require('./Src/Config/DB_Config.js');
const app = express();
const port = process.env.PORT || 5000;
const Laptop = require('./Src/Routes/Laptop/LaptopRoute.js')
const User = require('./Src/Routes/User/UserRoute.js')
const Component = require('./Src/Routes/Component/Components.js')
const monitor=require('./Src/Routes/Monitor/MonitorRoute.js')
const GPU_Route= require('./Src/Routes/GraphicsCard/GPU_Route')
const Phone= require('./Src/Routes/Phone/PhoneRoute.js')
const Question= require('./Src/Routes/Question/QuestionRouter.js')
const Review= require('./Src/Routes/Review/ReviewRoute.js')
const StripeRoute=require('./Src/Controller/PaymentController.js')
const cart=require('./Src/Routes/Cart/CartRoute.js')

app.use(cors());
app.use(express.json());
//----------------------------------------route using  --------------------------------------
app.use('/laptop', Laptop);
app.use('/user', User)
app.use('/component', Component)
app.use('/monitor', monitor)
app.use('/gpu',GPU_Route)
app.use('/phone',Phone)
app.use('/qna',Question)
app.use('/review',Review)
app.use("/payment",StripeRoute)
app.use("/cart",cart)




//---------------------------------------Connecting  to the database and server running-----------------
async function run() {
    try {
        await client.db("admin").command({ ping: 1 });
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('galaxy tech is serving server data')
})
app.listen(port, () => {

})
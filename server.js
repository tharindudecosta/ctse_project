const express = require('express');
const cors = require('cors');
const app = express();

// docker build -t ctse_products .
// docker run -p 3000:3000 ctse_products

require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    console.log(req.path +" "+ req.method)
    next()
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/products", require("./routes/productRouter"))
app.use("/api/filter", require("./routes/filterRouter"))
app.use("/api/inventory", require("./routes/inventoryRouter"))


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

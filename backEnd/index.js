require('dotenv').config();
require('./config/passportConfig');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const mongoose = require('mongoose');
mongoose.set('debug', true);

const admin_controller = require('./controllers/admin_controller');
const products_controller = require('./controllers/products_conroller');
const cartCtrl = require('./controllers/cart_controller');




app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use("/public", express.static(path.join(__dirname, 'public')));
const routes = require('./routes/router');
const cartRoutes = require('./routes/cart-router');

console.log("mongo string:", process.env.CONNECTION_STRING);

mongoose.connect(process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log('Database Error----------------', err);
        }
        console.log('Connected to database');
    });


app.use('/account', routes);
app.use('/cart', cartRoutes);
//app.get('/cart/:id',cartCtrl.fetchCart);
app.get('/products', products_controller.readAllProducts);
app.get('/product-details/:id', products_controller.readProduct);
app.post('/products', admin_controller.addProduct);
app.put('/products/:id', admin_controller.updateProduct);
app.delete('/products/deleteAll', admin_controller.deleteAllProduct);
app.delete('/products/:id', admin_controller.deleteProduct);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});
app.listen(3001, () => {
    console.log("server is running");
})
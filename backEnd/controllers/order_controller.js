const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require('../models/user');
const razorPay_Instance = require('../RazorPay_SDK/payment').instance;
const RazorPay_Config = require('../RazorPay_SDK/payment').config;
const { v4: uuidv4 } = require('uuid');

async function checkUser(id) {
    let result = await User.findById(id);
    return result;
}

module.exports = {

    async purchase(req, res) {
        console.log("inside purchase api");
        const { products, address, purchase_amount ,user_id} = req.body;
        let user = await checkUser(user_id);
        if (user) {


            var options = {
                amount: purchase_amount*100,  // amount in the smallest currency unit
                currency: "INR",
                receipt: uuidv4(),
                payment_capture: '0'
            };

            console.log("options recipt",options.receipt);


            razorPay_Instance.orders.create(options, function (err, data) {
                if(err)console.log("razorpay err",err);
                else{
                    console.log("order",data);
                    let order= new Order({
                        products: products,
                        address:address,
                        amount: data.amount,
                        order_id:data.id,
                        purchase_date:data.created_at,
                        status:data.status,
                        receipt:data.receipt,
                        userId:user_id
                    });

                    order.save((err,orderRes)=>{
                        if(err)console.log("error in saving",err);
                        else{
                            console.log("order saved res",orderRes);
                            
                            res.status(200).json({
                                message:"order created succesfully",
                                payload:{
                                    dbRes:orderRes,
                                    key:RazorPay_Config.key_id
                                }
                            
                            })
                        }
                    });

                }

            });








        }



    }

}
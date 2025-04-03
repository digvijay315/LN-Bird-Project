const Razorpay = require('razorpay');
const Order = require('../Modals/order');
const User = require("../Modals/regitration");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const payment = async (req, res) => {
    try {
        console.log("Received Request:", req.body);

        if (!req.body || !req.body.formData) {
            return res.status(400).json({ message: "Invalid request: Missing form data" });
        }

        let amount = req.body.formData.totalPrice;
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        amount = Math.round(Number(amount));

        // Razorpay Order Creation
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        if (razorpayOrder.id) {
            const orderData = req.body.formData;
            const orderid = razorpayOrder.id;

            const update = {
                ...orderData,
                orderid: orderid,
            };

            const newOrder = new Order(update);
            await newOrder.save();

            const { firstName, lastName, email, phone, password, apartmentNumber, selectstate, area, landmark, addressType, pincode } = req.body.formData;
             
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                console.log("User already exists, skipping user creation.");
            } else {
                user = new User({ firstName, lastName, email, phone, password, apartmentNumber, selectstate, area, landmark, addressType, pincode });
                await user.save();
            }
        }

       
        res.status(200).json(razorpayOrder);

    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ message: "Payment processing failed", error });
    }
};

module.exports = payment;

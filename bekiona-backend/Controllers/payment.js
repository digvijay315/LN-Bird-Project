const Razorpay = require('razorpay');
const Order = require('../Modals/order');
const User = require("../Modals/regitration");
const axios = require('axios'); // Make sure axios is installed

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const fetchWarehouses = async () => {
  const response = await axios.get('https://ship.nimbuspost.com/api/warehouse/fetch', {
    headers: {
      'NP-API-KEY': '0c12b436df7c7b6a35d1c9e0150fe497c04327fa182076'
    }
  });
  console.log("Warehouses:", response.data);
};

const payment = async (req, res) => {
    try {
        console.log("Received Request:", req.body);
        fetchWarehouses()

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

        

        if (!razorpayOrder.id) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

            const orderData = req.body.formData;
            const orderid = razorpayOrder.id;

            const update = {
                ...orderData,
                orderid: orderid,
            };

            const newOrder = new Order(update);
            await newOrder.save();

            const { firstName, lastName, email, phone, password, apartmentNumber, selectstate, area, landmark, addressType, pincode,selectcity,mobileNumber } = req.body.formData;
             
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                console.log("User already exists, skipping user creation.");
            } else {
                user = new User({ firstName, lastName, email, phone, password, apartmentNumber, selectstate, area, landmark, addressType, pincode, });
                await user.save();
            }
        

              
          // ✅ Create NimbusPost Shipment (B2B or B2C - this example uses B2C)
        //   const nimbusPayload = {
        //     consignee: {
        //       name: `${firstName} ${lastName}`,
        //       address: `${area}, ${landmark}, ${apartmentNumber || ""}`,
        //       address_2: '',
        //       city: selectcity,
        //       state: selectstate,
        //       pincode: pincode,
        //       phone: mobileNumber ? String(mobileNumber) : "0000000000"

        //     },
        //     order: {
        //         order_number: orderid,
        //         shipping_charges: 0,
        //         discount: 0,
        //         cod_charges: 0,
        //         payment_type: "prepaid", // or "cod"
        //         total: amount,
        //         package_weight: 500, // grams
        //         package_length: 10,
        //         package_height: 10,
        //         package_breadth: 10
        //     },
        //     order_items: [
        //         {
        //             name: "Ecommerce Product",
        //             qty: "1",
        //             price: amount,
        //             sku: "sku001"
        //         }
        //     ],
        //     pickup_warehouse_id: "228051",  // Replace with your actual warehouse ID
        //     // rto_warehouse_id: "3"
        // };

        // const nimbusResponse = await axios.post(
        //     'https://ship.nimbuspost.com/api/shipments/create',
        //     nimbusPayload,
        //     {
        //         headers: {
        //             'NP-API-KEY': '0c12b436df7c7b6a35d1c9e0150fe497c04327fa182076',
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // );

        // console.log("NimbusPost Response:", nimbusResponse.data);

        // // ✅ Save tracking info to the order
        // if (
        //     nimbusResponse.data &&
        //     nimbusResponse.data.data &&
        //     nimbusResponse.data.data.awb_number
        // ) {
        //     await Order.findByIdAndUpdate(newOrder._id, {
        //         shipment_id: nimbusResponse.data.data.awb_number,
        //         tracking_id: nimbusResponse.data.data.shipment_id
        //     });
        // }

        
  
        
       
        res.status(200).json(razorpayOrder);

    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ message: "Payment processing failed", error });
    }
};




const trackOrder = async (req, res) => {
    try {
      const { tracking_id } = req.params; // Assuming you send tracking_id in the route
  
      const response = await axios.get(`https://ship.nimbuspost.com/api/shipments/${tracking_id}`, {
        headers: {
          'NP-API-KEY': '0c12b436df7c7b6a35d1c9e0150fe497c04327fa182076'
        }
      });
  
    //   console.log("Tracking Data:", response.data);
      res.status(200).json(response.data);
  
    } catch (error) {
      console.error("Error tracking order:", error.response?.data || error.message);
      res.status(500).json({
        message: "Failed to track order",
        error: error.response?.data || error.message
      });
    }
  };




module.exports = {payment,trackOrder};

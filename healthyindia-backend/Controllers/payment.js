const Razorpay = require('razorpay');
const Order = require('../Modals/order');
const addproduct = require('../Modals/product');
const User = require("../Modals/regitration");
const axios = require('axios'); // Make sure axios is installed
const crypto = require('crypto');


const razorpayInstance = new Razorpay({
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


const loginNimbus = async () => {
  try {
    const response = await axios.post("https://ship.nimbuspost.com/api/users/login", {
      email: "sales.skycosmetics@gmail.com",
      password: "Kiona@2024",
    });


    return response.data.data;

  } catch (error) {
    console.error("Nimbus Login Failed:", error);
    throw new Error("Unable to login to NimbusPost");
  }
};


const payment = async (req, res) => {
    try {
  
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

        const razorpayOrder = await razorpayInstance.orders.create(options);

        if (!razorpayOrder.id) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        // Save to DB
          const newOrder = new Order({
            ...req.body.formData,
            orderid: razorpayOrder.id,
            totalPrice: amount,
            payment_status: "pending",
            createdAt: new Date()
          });

          await newOrder.save();

        // Return Razorpay order ID and amount to frontend
        res.status(200).json({
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: 'INR',
        });

    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ message: "Payment processing failed", error });
    }
};

// Handle payment success verification
const verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;
   
        // Validate payment signature from Razorpay
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(orderId + "|" + paymentId)
            .digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Payment verified successfully, now update the order status in the DB
        const order = await Order.findOne({ orderid: orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.payment_status = "success";
        order.paymentId = paymentId;
        order.paymentDate = new Date();
        await order.save();

        res.status(200).json({ message: "Payment successful, order updated!" });

    } catch (error) {
        console.error("Error in payment verification:", error);
        res.status(500).json({ message: "Payment verification failed", error });
    }
};


const codpayment = async (req, res) => {
  try {
    if (!req.body || !req.body.formData) {
      return res.status(400).json({ message: "Invalid request: Missing form data" });
    }

    const formData = req.body.formData;
    const amount = formData.totalPrice || 0;

    // Generate a unique order ID for COD
    const codOrderId = `COD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newOrder = new Order({
      ...formData,
      orderid: codOrderId,
      totalPrice: amount,
      payment_status: "pending",
      createdAt: new Date()
    });

    await newOrder.save();

    res.status(200).json({ message: "COD Order placed successfully", orderid: codOrderId });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ message: "Payment processing failed", error });
  }
};



const createNimbusShipment = async (req, res) => {
  try {
   
    const token = await loginNimbus(); // Get Nimbus token

     const orderItems = req.body.cartItems.map((item) => {
      return {
        name: item.product_name,   
        qty: item.product_quantity1,            
        price: item.product_price,        
        sku: item.product_sku            
      };
    });

    let payment_mode = req.body.payment_mode;
    let payment_type;

    if (payment_mode === 'online') {
        payment_type = 'prepaid';
    } else if (payment_mode === 'cod') {
        payment_type = 'cod';
    } else {
        // Optional: handle unexpected payment modes
        payment_type = 'cod';
    }


    const payload = {
      order_number: req.body.orderid || "#001",  // default order number
      // shipping_charges: req.body.shipping_charges || 40,
      // discount: req.body.discount || 100,
      // cod_charges: req.body.cod_charges || 30,
      payment_type: payment_type,  // payment type
      order_amount: req.body.totalPrice || 1000,
      package_weight: req.body.package_weight || 300,
      package_length: req.body.package_lenght || 10,
      package_breadth: req.body.package_breadth || 10,
      package_height: req.body.package_height || 10,
      consignee: {
        name: `${req.body.firstName} ${req.body.lastName}` || "Customer Name",
        address: `${req.body.area}, ${req.body.landmark}, ${req.body.apartmentNumber}` || "190, ABC Road",
        // address_2: `${req.body.area}, ${req.body.landmark}, ${req.body.apartmentNumber}` || "Near Bus Stand",
        city: req.body.selectcity|| "Mumbai",
        state: req.body.selectstate || "Maharastra",
        pincode: req.body.pincode || "400001",
        phone: req.body.mobileNumber || "9999999999"
      },
      pickup: {
        warehouse_name: "bekiona",
        name: "abhishek",
        address: "shop no 326 3rd floor kashi plaza building kamrej surat",
        // address_2: "shop no 326 3rd floor kashi plaza building kamrej surat",
        city: "surat",
        state: "Gujarat",
        pincode: "394185",
        phone: "9990499733",
      },
      order_items: orderItems, 
    };

    // console.log("Final Payload to Nimbus:", payload); // Debug

    const response = await axios.post(
      "https://api.nimbuspost.com/v1/shipments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(response);
    
    if (response.data && response.data.data && response.data.data.awb_number) {
      await Order.findByIdAndUpdate(req.body._id, {
        shipment_id: response.data.data.awb_number,
        tracking_id: response.data.data.shipment_id,
      });
    }

    return res.status(200).json({ message: "Shipment created successfully", data: response.data });
  } catch (error) {
    console.error("NimbusPost Shipment Error:", error);
    return res.status(500).json({ message: "Failed to create shipment", error: error.message });
  }
};




const trackOrder = async (req, res) => {
    try {
      const { tracking_id } = req.params; // Assuming you send tracking_id in the route

      const token = await loginNimbus(); 
   
      const response = await axios.get(`https://api.nimbuspost.com/v1/shipments/track/${tracking_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  const downloadlabel = async (req, res) => {
    try {
      const {tracking_id} = req.params; 
      const token = await loginNimbus(); 
      const response = await axios.post(`https://api.nimbuspost.com/v1/shipments/track/${tracking_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

  
    //   console.log("Tracking Data:", response.data);
      res.status(200).json(response.data);
  
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      res.status(500).json({
        message: "Failed to track order",
        error: error.response?.data || error.message
      });
    }
  };


module.exports = {payment,trackOrder,verifyPayment,createNimbusShipment,downloadlabel,codpayment};

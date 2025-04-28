const Razorpay = require('razorpay');
const Order = require('../Modals/order');
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



// const razorpayInstance = new Razorpay({
//     key_id: 'rzp_test_kh59VKLP3zCcop', // Your Razorpay test/live key
//     key_secret: 'YOUR_SECRET_KEY',
// });

// Endpoint for creating an order (already implemented in your code)
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

        const razorpayOrder = await razorpayInstance.orders.create(options);

        console.log(razorpayOrder);

        if (!razorpayOrder.id) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

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



const createNimbusShipment = async (orderData, newOrder) => {

  fetchWarehouses()
  try {
    const {
      firstName,
      lastName,
      area,
      landmark,
      apartmentNumber,
      pincode,
      selectcity,
      selectstate,
      mobileNumber,
    } = orderData;

    const token = await loginNimbus(); // Get Nimbus token

    const payload = {
      order_id: newOrder.orderid,
      payment_method: "prepaid",
      consignee_name: `${firstName} ${lastName}`,
      consignee_company_name: "Sanvi Enterprises",
      consignee_phone: mobileNumber ? String(mobileNumber) : "0000000000",
      consignee_email: "abc@gmail.com",
      consignee_gst_number: "24AAACC4175D1Z4",
      consignee_address: `${area}, ${landmark}, ${apartmentNumber || ""}`,
      consignee_pincode: pincode,
      consignee_city: selectcity,
      consignee_state: selectstate,
      no_of_invoices: "2",
      no_of_boxes: "2",
      courier_id: "110",
      request_auto_pickup: "yes",
      invoice: [
        {
          invoice_number: "INV-PG/23-24/001208",
          invoice_date: "20-05-2023",
          invoice_value: "100",
          ebn_number: "1234",
          ebn_expiry_date: "23-05-2023",
        },
        {
          invoice_number: "INV-PG/23-24/001208",
          invoice_date: "20-05-2023",
          invoice_value: "100",
          ebn_number: "1234",
          ebn_expiry_date: "23-05-2023",
        },
      ],
      pickup: {
        warehouse_name: "BIL",
        name: "BIL",
        address: "Khasra No 67102,11,12,20, 686Min, 14Min, 15Min,",
        address_2: "Khasra No 67102,11,12,20, 686Min, 14Min, 15Min,",
        city: "Gurugram",
        state: "HR",
        pincode: "110001",
        phone: "9999888877",
      },
      products: [
        {
          product_name: "Class 8 Computer Tech Wizard",
          product_hsn_code: "4901",
          product_lbh_unit: "cm",
          no_of_box: "1",
          product_tax_per: "0.0000",
          product_price: "100",
          product_weight_unit: "gram",
          product_length: "44",
          product_breadth: "29",
          product_height: "21",
          product_weight: 18000,
        },
        {
          product_name: "Class 8 Computer Tech Wizard",
          product_hsn_code: "4901",
          product_lbh_unit: "cm",
          no_of_box: "1",
          product_tax_per: "0.0000",
          product_price: "100",
          product_weight_unit: "gram",
          product_length: "44",
          product_breadth: "29",
          product_height: "21",
          product_weight: 18000,
        },
      ],
    };

    const response = await axios.post(
      "https://ship.nimbuspost.com/api/shipmentcargo/create",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("NimbusPost Response:", response.data);

    if (
      nimbusResponse.data &&
      nimbusResponse.data.data &&
      nimbusResponse.data.data.awb_number
    ) {
      await Order.findByIdAndUpdate(newOrder._id, {
        shipment_id: nimbusResponse.data.data.awb_number,
        tracking_id: nimbusResponse.data.data.shipment_id,
      });
    }

    return response.data;
  } catch (error) {
    console.error("NimbusPost Shipment Error:", error);
    throw error; // So the main function knows an error occurred
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




module.exports = {payment,trackOrder,verifyPayment};

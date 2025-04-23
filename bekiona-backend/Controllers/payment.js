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
         // Step 4: Get Nimbus Token
    const token = await loginNimbus();
    
    // Step 5: Create Shipment
    const nimbusPayload = {
      order_id: orderid, // Order ID (ensure 'orderid' is provided)
      payment_method: "prepaid", // Payment Method (Prepaid or COD)
      consignee_name: `${firstName} ${lastName}`, // Consignee Name
      consignee_company_name: "Sanvi Enterprises", // Consignee Company Name
      consignee_phone: mobileNumber ? String(mobileNumber) : "0000000000", // Consignee Phone
      consignee_email: "abc@gmail.com", // Consignee Email
      consignee_gst_number: "24AAACC4175D1Z4", // GST Number (if applicable)
      consignee_address: `${area}, ${landmark}, ${apartmentNumber || ""}`, // Consignee Address
      consignee_pincode: pincode, // Consignee Pincode
      consignee_city: selectcity, // Consignee City
      consignee_state: selectstate, // Consignee State
      no_of_invoices: "2", // Number of invoices
      no_of_boxes: "2", // Number of boxes
      courier_id: "110", // Courier ID (this should be provided based on your setup)
      request_auto_pickup: "yes", // Auto Pickup request (yes or no)
      invoice: [
        {
          invoice_number: "INV-PG/23-24/001208", // Invoice Number
          invoice_date: "20-05-2023", // Invoice Date
          invoice_value: "100", // Invoice Value
          ebn_number: "1234", // EBN Number
          ebn_expiry_date: "23-05-2023", // EBN Expiry Date
        },
        {
          invoice_number: "INV-PG/23-24/001208", // Invoice Number (second invoice)
          invoice_date: "20-05-2023", // Invoice Date
          invoice_value: "100", // Invoice Value
          ebn_number: "1234", // EBN Number
          ebn_expiry_date: "23-05-2023", // EBN Expiry Date
        },
      ],
      pickup: {
        warehouse_name: "BIL", // Warehouse Name
        name: "BIL", // Pickup Contact Name
        address: "Khasra No 67102,11,12,20, 686Min, 14Min, 15Min,", // Pickup Address
        address_2: "Khasra No 67102,11,12,20, 686Min, 14Min, 15Min,", // Optional second address line
        city: "Gurugram", // Pickup City
        state: "HR", // Pickup State
        pincode: "110001", // Pickup Pincode
        phone: "9999888877", // Pickup Phone
      },
      products: [
        {
          product_name: "Class 8 Computer Tech Wizard", // Product Name
          product_hsn_code: "4901", // Product HSN Code
          product_lbh_unit: "cm", // Unit of measurement for product dimensions
          no_of_box: "1", // Number of boxes for this product
          product_tax_per: "0.0000", // Product tax percentage
          product_price: "100", // Product Price
          product_weight_unit: "gram", // Weight unit
          product_length: "44", // Product Length (in cm)
          product_breadth: "29", // Product Breadth (in cm)
          product_height: "21", // Product Height (in cm)
          product_weight: 18000, // Product Weight (in grams)
        },
        {
          product_name: "Class 8 Computer Tech Wizard", // Product Name
          product_hsn_code: "4901", // Product HSN Code
          product_lbh_unit: "cm", // Unit of measurement for product dimensions
          no_of_box: "1", // Number of boxes for this product
          product_tax_per: "0.0000", // Product tax percentage
          product_price: "100", // Product Price
          product_weight_unit: "gram", // Weight unit
          product_length: "44", // Product Length (in cm)
          product_breadth: "29", // Product Breadth (in cm)
          product_height: "21", // Product Height (in cm)
          product_weight: 18000, // Product Weight (in grams)
        },
      ],
    };
    

    const nimbusResponse = await axios.post(
      "https://ship.nimbuspost.com/api/shipmentcargo/create",
      nimbusPayload,
      {
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("NimbusPost Response:", nimbusResponse.data);

    // Step 6: Save tracking to order
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

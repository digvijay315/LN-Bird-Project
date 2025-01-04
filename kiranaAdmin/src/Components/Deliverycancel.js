import React from 'react'
import Header from './Header'
import Footer from './footer'

function Deliverycancel() {
  return (
    <div>
        <Header/>
 <div style={{ padding: "40px", backgroundColor: "#f9f9f9",marginTop:"9rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Shipping and Delivery Policy for Kiona
      </h1>

      <section>
        <h4 style={{ color: "#333" }}>1. Introduction</h4>
        <p>
          At Kiona, we strive to deliver your skincare products in a timely and safe manner. This policy outlines the terms and conditions of our shipping and delivery process. Please review the following information carefully.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>2. Shipping Locations</h4>
        <p>
          We currently offer shipping to the following locations:
        </p>
        <ul>
          <li>Domestic (India): We ship to all major cities and towns across India.</li>
          <li>International: We are working towards providing global shipping. Please check the availability of your country during checkout.</li>
        </ul>
        <p>
          Shipping availability may vary depending on your location. You will be notified if your address is outside our serviceable areas.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>3. Shipping Costs</h4>
        <p>
          The shipping cost will be calculated based on the delivery location, size, and weight of your order. The final shipping cost will be displayed at the time of checkout before you confirm the purchase.
        </p>
        <p>
          We offer free shipping on orders above a certain amount. Please check our promotional offers or sign up for our newsletter for special shipping deals.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>4. Processing Time</h4>
        <p>
          Once your order is placed, it will be processed and shipped within 1-3 business days (excluding weekends and public holidays). In case of any delays, we will inform you via email or phone.
        </p>
        <p>
          You will receive an email with tracking information once your order has been dispatched.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>5. Delivery Time</h4>
        <p>
          The estimated delivery time for orders will depend on your location and the shipping method selected. Generally, you can expect the following:
        </p>
        <ul>
          <li>Domestic Orders (India): 3-7 business days.</li>
          <li>International Orders: 7-14 business days (subject to customs processing).</li>
        </ul>
        <p>
          Please note that delivery times may vary during peak seasons or due to unforeseen circumstances like weather or customs delays.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>6. Order Tracking</h4>
        <p>
          After your order has been dispatched, you will receive a tracking number via email or SMS. You can use this tracking number to monitor the status of your delivery. You can track your order through the courier's website or by contacting our customer support team.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>7. Failed Delivery Attempts</h4>
        <p>
          In case of a failed delivery attempt due to an incorrect address or unavailability of the recipient, the courier service will usually attempt re-delivery. After multiple failed attempts, the package may be returned to us.
        </p>
        <p>
          If the product is returned to Kiona due to unsuccessful delivery attempts, we will notify you and offer you an option to reship the product. Additional shipping charges may apply in such cases.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>8. Customs and Import Duties (For International Orders)</h4>
        <p>
          For international deliveries, the recipient is responsible for any customs duties, taxes, or other fees that may apply. Kiona is not responsible for any delays or charges incurred due to customs processing.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>9. Undeliverable Packages</h4>
        <p>
          If the package is undeliverable due to an incorrect address or failure to claim the package, it will be returned to us. We will contact you to confirm the delivery details and arrange for reshipment. Additional shipping charges may apply.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>10. Contact Us</h4>
        <p>
          If you have any questions about our shipping or delivery process, please feel free to contact our customer support team:
        </p>
        <p>Email: <strong>support@kiona.com</strong></p>
        <p>Phone: <strong>+123 456 7890</strong></p>
        <p>Our team is available Monday to Friday, from 9:00 AM to 6:00 PM.</p>
      </section>
    </div>
     <Footer/>
    </div>
  )
}

export default Deliverycancel

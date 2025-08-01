import React from 'react'
import Header from './Header'
import Footer from './footer'

function Privacypolicy() {
  return (
    <div>
        <Header/>

<div style={{ padding: "40px", backgroundColor: "#f9f9f9",marginTop:"9rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Privacy Policy for Kiona
      </h1>

      <section>
        <h4 style={{ color: "#333" }}>1. Introduction</h4>
        <p>
          At Kiona, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website, use our services, or purchase our products. By using Kiona, you agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>2. Information We Collect</h4>
        <p>
          We collect personal information to provide and improve our services. The types of information we collect include:
        </p>
        <ul>
          <li>Personal details like name, email address, phone number, and delivery address.</li>
          <li>Payment information such as credit card details (we use third-party payment processors to handle payments securely).</li>
          <li>Browsing information through cookies and similar technologies to enhance your user experience.</li>
        </ul>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>3. How We Use Your Information</h4>
        <p>
          The information we collect is used for the following purposes:
        </p>
        <ul>
          <li>To process your orders and deliver products to you.</li>
          <li>To communicate with you regarding your account, orders, and our services.</li>
          <li>To improve our website and services, ensuring a better customer experience.</li>
          <li>To send promotional offers, newsletters, and other marketing communications (you can opt out at any time).</li>
        </ul>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>4. Data Protection and Security</h4>
        <p>
          We take your privacy seriously and implement appropriate security measures to protect your personal information. We use encryption technologies and secure payment gateways to safeguard your data during transmission.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>5. Sharing Your Information</h4>
        <p>
          Kiona will not sell, rent, or share your personal information with third parties without your consent, except in the following circumstances:
        </p>
        <ul>
          <li>To service providers who assist us in fulfilling orders or operating our business.</li>
          <li>If required by law or to protect our legal rights and interests.</li>
        </ul>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>6. Cookies and Tracking Technologies</h4>
        <p>
          We use cookies and similar technologies to track browsing behavior on our website. Cookies help us analyze web traffic, improve site functionality, and enhance user experience. You can manage or disable cookies through your browser settings.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>7. Your Rights and Choices</h4>
        <p>
          You have the right to access, update, or delete your personal information. If you would like to exercise these rights, please contact us through our customer service channels. Additionally, you can opt-out of receiving marketing communications from us.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>8. Changes to This Privacy Policy</h4>
        <p>
          We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and the updated date will be indicated at the bottom of the policy.
        </p>
      </section>

      <section>
        <h4 style={{ color: "#333" }}>9. Contact Us</h4>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or how we handle your personal information, please contact us at:
        </p>
        <p>Email: privacy@kiona.com</p>
        <p>Phone: +123 456 7890</p>
      </section>
    </div>
    <Footer />
    </div>
  )
}

export default Privacypolicy
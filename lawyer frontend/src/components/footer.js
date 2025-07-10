import React from "react";
import "../css/footer.css";

const ratings = [
  {
    score: "4.5/5",
    label: "review on",
    img: "images/google-logo.svg",
    alt: "Google",
  },
  {
    score: "4.5/5",
    label: "review on",
    img: "images/mouthshut.svg",
    alt: "MouthShut",
  },
];

const stats = [
  {
    value: "5,00,000+",
    label: "Customers",
    img: "images/Invite.svg",
    alt: "Add-Customer",
  },
  {
    value: "300+",
    label: "Professionals Onboarded",
    img: "images/rocket-final.svg",
    alt: "Onboard Customer",
  },
  {
    value: "50,000+",
    label: "Business Served",
    img: "images/perspective.svg",
    alt: "Business Served",
  },
  {
    value: "1000+",
    label: "Companies",
    img: "images/Briefcase_blue.svg",
    alt: "Companies Briefcase",
  },
];

const expertLinks = [
  { label: "Talk To Company Secretary", href: "https://www.zolvit.com/talk-to-company-secretary" },
  { label: "Talk To CA", href: "https://www.zolvit.com/talk-to-ca" },
  { label: "Talk To Lawyer", href: "https://www.zolvit.com/lawyers" },
  { label: "Family Lawyer", href: "https://www.zolvit.com/lawyers/family" },
  { label: "Property Lawyer", href: "https://www.zolvit.com/lawyers/property" },
  { label: "Criminal Lawyer", href: "https://www.zolvit.com/lawyers/criminal" },
  { label: "Labour Lawyer", href: "https://www.zolvit.com/lawyers/labour" },
  { label: "Civil Lawyer", href: "https://www.zolvit.com/lawyers/civil" },
  { label: "Consumer Lawyer", href: "https://www.zolvit.com/lawyers/consumer" },
  { label: "Consitutional Lawyer", href: "https://www.zolvit.com/lawyers/constitutional" },
  { label: "Intellectual Property Lawyer", href: "https://www.zolvit.com/lawyers/intellectual-property" },
  { label: "Business Lawyer", href: "https://www.zolvit.com/lawyers/business" },
];

const businessLinks = [
  { label: "Company Registration", href: "https://www.zolvit.com/company-registration" },
  { label: "LLP Registration", href: "https://www.zolvit.com/company-registration/llp" },
  { label: "Producer Company Registration", href: "https://www.zolvit.com/company-registration/producer-company" },
  { label: "Nidhi Company Registration", href: "https://www.zolvit.com/company-registration/nidhi-company" },
  { label: "Startup India Scheme", href: "https://www.zolvit.com/company-registration/startup-india-scheme" },
  { label: "Partnership Firm Deed", href: "https://www.zolvit.com/company-registration/partnership-firm-deed" },
  { label: "One Person Company Registration", href: "https://www.zolvit.com/company-registration/one-person-company" },
  { label: "Authorised Share Capital", href: "https://www.zolvit.com/authorised-share-capital" },
  { label: "Memorandum Of Understanding", href: "https://www.zolvit.com/memorandum-of-understanding" },
  { label: "Change Company Name", href: "https://www.zolvit.com/change-company-name" },
];

const ipLinks = [
  { label: "Intellectual Property Services In India", href: "https://www.zolvit.com/ipindia" },
  { label: "Trademark Registration", href: "https://www.zolvit.com/ipindia/trademark-registration" },
  { label: "Trademark Registration In Usa", href: "https://www.zolvit.com/ipindia/trademark-registration-in-usa" },
  { label: "Trademark Registration For Individuals", href: "https://www.zolvit.com/ipindia/trademark-registration-for-individuals" },
  { label: "Trademark Assignment", href: "https://www.zolvit.com/ipindia/trademark-assignment" },
  { label: "Trademark Renewal", href: "https://www.zolvit.com/ipindia/trademark-renewal" },
];

const licensesLinks = [
  { label: "PSARA License", href: "https://www.zolvit.com/psara-license" },
  { label: "Trade License Renewal Registration", href: "https://www.zolvit.com/trade-license-renewal-registration" },
  { label: "FSSAI", href: "https://www.zolvit.com/fssai" },
  { label: "Professional Tax Registration", href: "https://www.zolvit.com/professional-tax-registration" },
  { label: "Online PF Registration", href: "https://www.zolvit.com/online-pf-registration" },
  { label: "NGO Registration", href: "https://www.zolvit.com/ngo-registration" },
  { label: "Sole Proprietorship Registration India", href: "https://www.zolvit.com/company-registration/sole-proprietorship" },
  { label: "Online ESI Registration", href: "https://www.zolvit.com/online-esi-registration" },
  { label: "Udyog Aadhaar Registration", href: "https://www.zolvit.com/udyog-aadhaar-registration" },
  { label: "Digital Signature Certificate", href: "https://www.zolvit.com/digital-signature-certificate" },
  { label: "Legal Metrology", href: "https://www.zolvit.com/legal-metrology" },
];

const socials = [
  { alt: "facebook", href: "https://www.facebook.com/vakilsearch", img: "images/facebook.svg" },
  { alt: "instagram", href: "https://www.instagram.com/vakilsearch_legal", img: "images/instagram.svg" },
  { alt: "linkedin", href: "https://www.linkedin.com/company/vakilsearch-com", img: "images/linkedin.svg" },
  { alt: "twitter", href: "https://twitter.com/Letsvakilsearch", img: "images/twitter.svg" },
  { alt: "youtube", href: "https://www.youtube.com/c/vakilsearchonline", img: "images/youtube.svg" },
];

const footerLinks = [
  { label: "Terms & Conditions", href: "https://www.zolvit.com/terms-of-service" },
  { label: "Privacy Policy", href: "https://www.zolvit.com/privacy-policy" },
  { label: "Refund Policy", href: "https://www.zolvit.com/refund-policy" },
  { label: "Contact Us", href: "https://www.zolvit.com/contact-us" },
];

const Footer = () => (
  <footer className="olc-footer" id="footerSection">
    <div className="olc-footer-container">
      {/* Ratings */}
      <div className="olc-footer-ratings">
        {ratings.map((r, idx) => (
          <div className="olc-footer-rating-item" key={idx}>
            <div>
              <p className="olc-footer-rating-score">{r.score}</p>
              <p className="olc-footer-rating-label">{r.label}</p>
            </div>
            <img src={r.img} alt={r.alt} />
          </div>
        ))}
      </div>
      {/* Stats */}
      <div className="olc-footer-stats">
        {stats.map((stat, idx) => (
          <div className="olc-footer-stat-item" key={idx}>
            <img src={stat.img} alt={stat.alt} width={100} height={100} />
            <div>
              <p className="olc-footer-stat-value">{stat.value}</p>
              <p className="olc-footer-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile Logo */}
      <div className="olc-footer-logo-mobile">
        <img width={149} src="https://assets.vakilsearch.com/live-images/zolvit_logo_gray.svg" alt="zolvit-logo" />
      </div>
      {/* Footer Links */}
      <div className="olc-footer-links">
        <div className="olc-footer-links-group">
          <p className="olc-footer-links-title">Expert Consultation</p>
          {expertLinks.map(link => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
              <p className="olc-footer-link">{link.label}</p>
            </a>
          ))}
        </div>
        <div className="olc-footer-links-group">
          <p className="olc-footer-links-title">Business Setup & Company Registrations</p>
          {businessLinks.map(link => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
              <p className="olc-footer-link">{link.label}</p>
            </a>
          ))}
        </div>
        <div className="olc-footer-links-group">
          <p className="olc-footer-links-title">Trademarks & IP</p>
          {ipLinks.map(link => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
              <p className="olc-footer-link">{link.label}</p>
            </a>
          ))}
        </div>
        <div className="olc-footer-links-group">
          <p className="olc-footer-links-title">Licenses & Registrations</p>
          {licensesLinks.map(link => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
              <p className="olc-footer-link">{link.label}</p>
            </a>
          ))}
        </div>
      </div>
      {/* Footer Disclaimer */}
      <p className="olc-footer-disclaimer">
        Please note that we are a facilitating platform enabling access to reliable professionals. We are not a law firm and do not provide legal services ourselves. The information on this website is for the purpose of knowledge only and should not be relied upon as legal advice or opinion.
      </p>
      {/* Bottom Container: Logo, Socials, Policies */}
      <div className="olc-footer-bottom">
        <div>
          <img width={149} src="https://assets.vakilsearch.com/live-images/zolvit_logo_gray.svg" alt="zolvit-logo" />
          <div>
            {socials.map(s => (
              <a href={s.href} target="_blank" rel="noopener noreferrer" key={s.alt}>
                <img src={s.img} alt={s.alt} />
              </a>
            ))}
          </div>
        </div>
        <ul className="olc-footer-policies">
          {footerLinks.map(link => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.label}>
              <li>{link.label}</li>
            </a>
          ))}
        </ul>
      </div>
      {/* Mobile Socials */}
      <div className="olc-footer-socials-mobile">
        <div>
          {socials.map(s => (
            <a href={s.href} target="_blank" rel="noopener noreferrer" key={s.alt + "-mobile"}>
              <img src={s.img} alt={s.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

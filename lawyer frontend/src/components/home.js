import React from "react";
import { useRef,useState } from "react";
import '../css/OnlineLawyerConsultation.css'; // Uncomment after you add the CSS
import Header from './header';
import Footer from "./footer";

const Home = () => {

  const coverCards = [
  { title: "Legal Notices", img: "https://assets.vakilsearch.com/consult_legal_notices.svg" },
  { title: "Company Law Matters", img: "https://assets.vakilsearch.com/consult_company.svg" },
  { title: "Legal Documentation", img: "https://assets.vakilsearch.com/consult_legal_documentation.svg" },
  { title: "Others", img: "https://assets.vakilsearch.com/consult_others.svg" },
  { title: "Property Lawyer", img: "https://assets.vakilsearch.com/consult_property.svg" },
  { title: "Family Lawyer", img: "https://assets.vakilsearch.com/consult_family.svg" },
  { title: "Consumer Lawyer", img: "https://assets.vakilsearch.com/consult_consumer.svg" },
  { title: "Civil Lawyer", img: "https://assets.vakilsearch.com/consult_civil.svg" },
  { title: "Criminal Lawyer", img: "https://assets.vakilsearch.com/consult_criminal.svg" },
  { title: "IP Lawyer", img: "https://assets.vakilsearch.com/consult_ip.svg" },
  { title: "Labour Lawyer", img: "https://assets.vakilsearch.com/consult_labour.svg" },
  { title: "Constitutional Lawyer", img: "https://assets.vakilsearch.com/consult_constitutional.svg" },
];

const CARDS_PER_PAGE = 4;


  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(coverCards.length / CARDS_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  const start = page * CARDS_PER_PAGE;
  const visibleCards = coverCards.slice(start, start + CARDS_PER_PAGE);

const consultants = [
  {
    name: "SJ Anakha",
    img: "https://assets.vakilsearch.com/live-images/ttl/authors-anakha.svg",
    desc: "Solves cheque bounce, money recovery & DRT cases.",
    experience: "5 years of Experience",
  },
  {
    name: "Kanisha",
    img: "https://assets.vakilsearch.com/live-images/ttl/authors-kanisha.svg",
    desc: "Handles succession, registration, verification of property efficiently.",
    experience: "3 years of Experience",
  },
  {
    name: "Srijita",
    img: "https://assets.vakilsearch.com/live-images/ttl/authors-srijitha.svg",
    desc: "Handles accident claims, employment issues, consumer complaints.",
    experience: "8 years of Experience",
  },
  {
    name: "Kavitha Natesan",
    img: "https://assets.vakilsearch.com/live-images/ttl/kavitha-natesan.svg",
    desc: "Cheque Bounce, GST Consultant",
    experience: "12 years of Experience",
  },
];

const CARDS_PER_PAGE1 = 3;
  const [page1, setPage1] = useState(0);
  const totalPages1 = Math.ceil(consultants.length / CARDS_PER_PAGE1);

  const handlePrev1 = () => setPage1((p) => Math.max(p - 1, 0));
  const handleNext1 = () => setPage1((p) => Math.min(p + 1, totalPages - 1));

  const start1 = page1 * CARDS_PER_PAGE1;
  const visibleConsultants = consultants.slice(start1, start1 + CARDS_PER_PAGE1);


  const legalPoints = [
  {
    title: "Expert Legal Advice:",
    desc: "Receive guidance on understanding rights and the law.",
  },
  {
    title: "Handling Legal Matters:",
    desc: "Legal issues are managed on your behalf, reducing time and stress.",
  },
  {
    title: "Court Representation:",
    desc: "Interests are represented in court with effective case presentation.",
  },
  {
    title: "Negotiating Agreements:",
    desc: "Agreements and settlements are negotiated to achieve the best outcome.",
  },
  {
    title: "Protecting Rights:",
    desc: "Legal representation ensures rights are safeguarded throughout the legal process.",
  },
  {
    title: "Managing Paperwork:",
    desc: "Necessary legal documentation and filings are handled efficiently.",
  },
  {
    title: "Guiding the Legal System:",
    desc: "Gain clarity for complex legal procedures, ensuring compliance and smooth progress.",
  },
];


const legalExpertise = [
  {
    title: "Family Lawyer",
    img: "https://assets.vakilsearch.com/consult_family.svg",
    alt: "Family Lawyer",
    link: "https://www.zolvit.com/lawyers/family",
    description:
      "A professional who can help address legal issues related to family law: divorces, child custody, child support, paternity, alimony, legal separation, guardianship, adoption, prenuptial agreements, domestic violence, and dowry issues.",
    cta: "Consult Family Lawyer Online",
  },
  {
    title: "Property Lawyer",
    img: "https://assets.vakilsearch.com/consult_property.svg",
    alt: "Property Lawyer",
    link: "https://www.zolvit.com/lawyers/property",
    description:
      "Helps with property disputes, real estate transactions, landlord-tenant issues, title deeds, registration, zoning, land use, inheritance, homeowner association services, foreclosure, and property dispute taxes.",
    cta: "Consult Property Lawyer Online",
  },
  {
    title: "Civil Lawyer",
    img: "https://assets.vakilsearch.com/consult_civil.svg",
    alt: "Civil Lawyer",
    link: "https://www.zolvit.com/lawyers/civil",
    description:
      "Presents cases that don't involve criminal charges: personal injury, breach of contract, defamation, employment disputes, debt collections, and ensures businesses follow the law in dealings with customers.",
    cta: "Consult Civil Lawyer Online",
  },
  {
    title: "Business Lawyer",
    img: "https://assets.vakilsearch.com/consult_company.svg",
    alt: "Business Lawyer",
    link: "https://www.zolvit.com/lawyers/business",
    description:
      "Advises business owners on legal issues: contracts, employment law, negotiations, taxation, regulatory compliance, mergers & acquisitions, anti-trust, corruption, commercial real estate, business litigation, and corporate governance.",
    cta: "Consult Business Lawyer Online",
  },
  {
    title: "Criminal Lawyer",
    img: "https://assets.vakilsearch.com/consult_criminal.svg",
    alt: "Criminal Lawyer",
    link: "https://www.zolvit.com/lawyers/criminal",
    description:
      "Represents or prosecutes people accused of crimes: drug offenses, DUIs, assault, theft, murder, white-collar crimes, cybercrimes, tax evasion, identity theft, and forgeries.",
    cta: "Consult Criminal Lawyer Online",
  },
  {
    title: "Consumer Lawyer",
    img: "https://assets.vakilsearch.com/consult_consumer.svg",
    alt: "Consumer Lawyer",
    link: "https://www.zolvit.com/lawyers/consumer",
    description:
      "Advocates for consumer rights: product liability, false advertising, unfair trade practices, consumer fraud, warranty claims, debt collection, credit reporting, bankruptcy, and privacy/data protection.",
    cta: "Consult Consumer Lawyer Online",
  },
  {
    title: "Labour Lawyer",
    img: "https://assets.vakilsearch.com/consult_labour.svg",
    alt: "Labour Lawyer",
    link: "https://www.zolvit.com/lawyers/labour",
    description:
      "Helps with employment and labor law issues: contracts, wrongful termination, discrimination, harassment, wage disputes, workplace safety, collective bargaining, leave, retirement benefits, and workplace policy.",
    cta: "Consult Labour Lawyer Online",
  },
  {
    title: "Constitutional Lawyer",
    img: "https://assets.vakilsearch.com/consult_constitutional.svg",
    alt: "Constitutional Lawyer",
    link: "https://www.zolvit.com/lawyers/constitutional",
    description:
      "Handles cases involving constitutional rights and freedoms: civil rights, liberties, equal protection, due process, freedom of speech/religion, privacy, separation of powers, and voting rights.",
    cta: "Consult Constitutional Lawyer Online",
  },
  {
    title: "Intellectual Property (IP) Lawyer",
    img: "https://assets.vakilsearch.com/consult_ip.svg",
    alt: "Intellectual Property (IP) Lawyer",
    link: "https://www.zolvit.com/lawyers/intellectual-property",
    description:
      "Protects and enforces rights of creators/owners: patents, trademarks, copyrights, trade secrets, licensing, IP litigation, domain disputes, counterfeiting, international IP, and digital rights management.",
    cta: "Consult IP Lawyer Online",
  },
];


const expertServices = [
  {
    title: "Online Consultation with a Lawyer",
    description: "Get expert legal advice from the comfort of your home.",
    img: "https://assets.vakilsearch.com/live-images/service1.svg",
    gradient: "olc-service-gradient-right",
    labelGradient: "olc-service-label-gradient-right",
    cardRadius: "olc-service-card-radius-right",
    labelRadius: "olc-service-label-radius-right",
  },
  {
    title: "Documentation and Expert Professional",
    description: "Access expert assistance for all your legal documentation needs.",
    img: "https://assets.vakilsearch.com/live-images/service2.svg",
    gradient: "olc-service-gradient-left",
    labelGradient: "olc-service-label-gradient-left",
    cardRadius: "olc-service-card-radius-left",
    labelRadius: "olc-service-label-radius-left",
  },
  {
    title: "Check Your Challan Status",
    description: "Stay informed about your challan status with our easy-to-use service.",
    img: "https://assets.vakilsearch.com/live-images/service3.svg",
    gradient: "olc-service-gradient-right",
    labelGradient: "olc-service-label-gradient-right",
    cardRadius: "olc-service-card-radius-right",
    labelRadius: "olc-service-label-radius-right",
  },
  {
    title: "File a Complaint",
    description: "File legal complaints with guidance and support.",
    img: "https://assets.vakilsearch.com/live-images/service4.svg",
    gradient: "olc-service-gradient-left",
    labelGradient: "olc-service-label-gradient-left",
    cardRadius: "olc-service-card-radius-left",
    labelRadius: "olc-service-label-radius-left",
  },
  {
    title: "Send a Legal Notice",
    description: "Ensure your legal notices are drafted and delivered correctly.",
    img: "https://assets.vakilsearch.com/live-images/service5.svg",
    gradient: "olc-service-gradient-right",
    labelGradient: "olc-service-label-gradient-right",
    cardRadius: "olc-service-card-radius-right",
    labelRadius: "olc-service-label-radius-right",
  },
  {
    title: "Get Bail",
    description: "Receive prompt assistance with bail applications and processes.",
    img: "https://assets.vakilsearch.com/live-images/service6.svg",
    gradient: "olc-service-gradient-left",
    labelGradient: "olc-service-label-gradient-left",
    cardRadius: "olc-service-card-radius-left",
    labelRadius: "olc-service-label-radius-left",
  },
  {
    title: "Property Dispute Support",
    description: "Get expert help for resolving property-related disputes.",
    img: "https://assets.vakilsearch.com/live-images/service7.svg",
    gradient: "olc-service-gradient-right",
    labelGradient: "olc-service-label-gradient-right",
    cardRadius: "olc-service-card-radius-right",
    labelRadius: "olc-service-label-radius-right",
  },
  {
    title: "Family Law Support",
    description: "Opt for comprehensive support for family law matters, including divorce and custody issues.",
    img: "https://assets.vakilsearch.com/live-images/service8.svg",
    gradient: "olc-service-gradient-left",
    labelGradient: "olc-service-label-gradient-left",
    cardRadius: "olc-service-card-radius-left",
    labelRadius: "olc-service-label-radius-left",
  },
];



const onlineBenefits = [
  {
    title: "Convenience",
    desc: "Consult a lawyer from home, without the need to travel or schedule an in-person appointment.",
  },
  {
    title: "Privacy",
    desc: "Maintain confidentiality by consulting a lawyer privately, avoiding visits to law offices or court premises.",
  },
  {
    title: "Cost-Effectiveness",
    desc: "Lower overheads make online consultations more competitively priced compared to traditional law firms.",
  },
  {
    title: "Efficiency",
    desc: "Online law practices offer tools for sharing and collaborating on documents, improving transparency and productivity.",
  },
  {
    title: "Accessibility",
    desc: "Access legal experts from anywhere, regardless of your location.",
  },
  {
    title: "Time Efficiency",
    desc: "Save time and energy by opting for quicker online consultations.",
  },
  {
    title: "Dispute Resolution",
    desc: "Online platforms can help resolve disputes swiftly and cost-effectively.",
  },
  {
    title: "Confidential and Secure",
    desc: "Ensure your legal matters are handled with the utmost confidentiality and security.",
  },
];



const whyZolvitCards = [
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit1.svg",
    desc: "Connect with top legal professionals for expert advice",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit2.svg",
    desc: "We cover all your legal needs comprehensively",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit3.svg",
    desc: "Access legal assistance anytime, anywhere through our easy platform",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit4.svg",
    desc: "Enjoy transparent pricing with no hidden costs",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit5.svg",
    desc: "Get personalised legal services tailored to your requirements",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit6.svg",
    desc: "Save time with prompt responses and quick resolutions.",
  },
];


const cities = [
  "Chennai",
  "Madurai",
  "Cochin",
  "Bangalore",
  "Coimbatore",
  "Lucknow",
  "Kolkata",
  "Delhi",
  "Hyderabad",
  "Mumbai",
  "Chandigarh",
  "Pune",
];


const faqs = [
  {
    question: "What services do lawyers provide?",
    answer:
      "Lawyers offer legal advice, represent clients in court, draft and review contracts, help with dispute resolution, and provide guidance on compliance, documentation, and negotiations across various areas of law.",
  },
  {
    question: "What is legal representation?",
    answer:
      "Legal representation means having a qualified lawyer act on your behalf in legal matters, ensuring your rights are protected and your case is presented effectively in legal proceedings.",
  },
  {
    question: "How do I know if I need a lawyer for my legal issue?",
    answer:
      "If your issue involves significant financial, personal, or business consequences, or you’re unsure about your rights or obligations, it’s wise to consult a lawyer for guidance.",
  },
  {
    question: "What is the role of a lawyer in a trial?",
    answer:
      "A lawyer presents evidence, examines witnesses, makes legal arguments, and advocates for your interests throughout the trial process.",
  },
  {
    question: "What are the common types of legal cases lawyers handle?",
    answer:
      "Common cases include family law, property disputes, civil litigation, business matters, criminal defense, consumer rights, employment law, intellectual property, and constitutional issues.",
  },
  {
    question: "How does the legal consultation process work?",
    answer:
      "You provide details about your issue, schedule a consultation, discuss your case with a lawyer, receive initial advice, and learn about your legal options and next steps.",
  },
  {
    question: "What is the importance of legal advice?",
    answer:
      "Legal advice helps you understand your rights, avoid costly mistakes, and make informed decisions, ensuring you’re protected in legal matters.",
  },
  {
    question: "What should I bring to my first meeting with a lawyer?",
    answer:
      "Bring all relevant documents, contracts, correspondence, identification, and a summary of your issue to help the lawyer understand your situation.",
  },
  {
    question: "How does the appeal process work in a legal case?",
    answer:
      "If you disagree with a court’s decision, your lawyer can help file an appeal to a higher court, presenting legal arguments for why the decision should be reconsidered.",
  },
  {
    question: "What is a legal brief?",
    answer:
      "A legal brief is a written document prepared by a lawyer outlining the facts, legal arguments, and supporting laws or precedents for a case.",
  },
  {
    question: "How can I ensure my lawyer acts ethically?",
    answer:
      "Choose a licensed lawyer, check their credentials, read reviews, and ensure they follow professional codes of conduct. You have the right to report unethical behavior to the relevant bar association.",
  },
  {
    question: "What is a deposition in legal proceedings?",
    answer:
      "A deposition is a formal, out-of-court testimony given under oath, where lawyers question witnesses and record their answers for use in court.",
  },
  {
    question: "What are my rights as a client when working with a lawyer?",
    answer:
      "You have the right to confidentiality, clear communication, competent representation, and to make decisions about your case. You can also change lawyers if needed.",
  },
  {
    question: "What is the importance of case law in legal decisions?",
    answer:
      "Case law, or judicial precedents, guides courts in interpreting laws and ensures consistency in legal decisions.",
  },
  {
    question: "How do lawyers protect intellectual property?",
    answer:
      "Lawyers help register patents, trademarks, and copyrights, draft licensing agreements, and represent clients in infringement disputes.",
  },
  {
    question: "How can I find a qualified lawyer for my case?",
    answer:
      "Research online, seek referrals, check credentials, read client reviews, and consult with lawyers to find one with relevant experience for your needs.",
  },
  {
    question: "What should I consider when choosing a lawyer?",
    answer:
      "Consider their experience, expertise, communication style, fees, reputation, and your comfort level with them.",
  },
  {
    question: "What is the difference between a lawyer and an attorney?",
    answer:
      "In most contexts, the terms are used interchangeably. In some regions, an attorney specifically refers to someone qualified to represent clients in court.",
  },
  {
    question: "What are legal consultation fees?",
    answer:
      "Fees vary by lawyer, case complexity, and location. Some offer free initial consultations, while others charge a fixed or hourly rate.",
  },
  {
    question: "How does a contingency fee arrangement work?",
    answer:
      "In a contingency arrangement, the lawyer is paid a percentage of the amount recovered if you win the case. If you lose, you may not owe legal fees, but could still be responsible for other costs.",
  },
];

 const [openIndex, setOpenIndex] = React.useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(idx === openIndex ? null : idx);
  };


  const [specialization, setSpecialization] = useState('');
  const [court, setcourt] = useState('');

    const SPECIALIZATIONS = [
  { value: '', label: 'Select Specialization' },
  { value: 'property lawyer', label: 'Property Lawyer' },
  { value: 'family lawyer', label: 'Family Lawyer' },
  { value: 'civil lawyer', label: 'Civil Lawyer' },
  { value: 'cyber lawyer', label: 'Cyber Lawyer' },
  { value: 'criminal lawyer', label: 'Criminal Lawyer' },
  { value: 'consumer lawyer', label: 'Consumer Lawyer' },
  { value: 'labour lawyer', label: 'Labour Lawyer' },
  { value: 'legal notice drafting', label: 'Legal Notice Drafting' },
  { value: 'company law & corporate compliance', label: 'Company Law & Corporate Compliance' },
];

const Courts = [
  { value: '', label: 'Select Courts' },
  { value: 'other', label: 'Other' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'tamilnadu', label: 'Tamil Nadu' },
  // ...add more
];




    return(
<div>
      <Header/>
  <div className="olc-root">

    <section className="olc-banner-bg" style={{marginTop:"10px"}}>
      <div className="olc-banner" id="main-banner">
       
        <div className="olc-banner-content">
          {/* Left: Headline and Benefits */}
          <div className="olc-banner-left">
            <h1 className="olc-banner-title">Online Lawyer Consultation India</h1>

            <div className="findlawyer">
  <div className="findlawyer-glass" />
  <h2 className="findlawyer-title">
    🔎 Find a Lawyer
  </h2>
  <div className="findlawyer-controls">
    <select
      value={specialization}
      onChange={e => setSpecialization(e.target.value)}
      className="findlawyer-select"
    >
      {SPECIALIZATIONS.map(spec => (
        <option key={spec.value} value={spec.value}>
          {spec.label}
        </option>
      ))}
    </select>
    <select
      value={court}
      onChange={e => setcourt(e.target.value)}
      className="findlawyer-select"
    >
      {Courts.map(st => (
        <option key={st.value} value={st.value}>
          {st.label}
        </option>
      ))}
    </select>
    <button
      className="action-btn findlawyer-btn"
      title="Chat Now"
    //   onClick={filterLawyersAndChat}
    >
      Chat Now
    </button>
  </div>
</div>


            {/* <ul className="olc-benefits-list">
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Tick" width="20" height="20" />
                <span>Consult a lawyer online and get expert legal service.</span>
              </li>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Tick" width="20" height="20" />
                <span>Confidential and secure calls with complete data protection.</span>
              </li>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Tick" width="20" height="20" />
                <span>Get expert consultations starting at ₹13/min.</span>
              </li>
              <li>
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" alt="Tick" width="20" height="20" />
                <span>End-to-end legal notice drafting and documentation services.</span>
              </li>
            </ul> */}
            {/* Process Steps (Desktop) */}
            <div className="olc-process-desktop">
              <p className="olc-process-title">Process</p>
              <div className="olc-process-steps">
                <div className="olc-process-step">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Fill Form" />
                  <span>Select details</span>
                </div>
                <div className="olc-process-step">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Schedule" />
                  <span>Wait for a few minutes</span>
                </div>
                <div className="olc-process-step">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Payment" />
                  <span>chat with lawyer</span>
                </div>
                {/* <div className="olc-process-step">
                  <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Call" />
                  <span>Lawyer Will Call You</span>
                </div> */}
              </div>
            </div>
          </div>
          {/* Right: Lead Form */}
          {/* <div className="olc-banner-right" id="leadForm">
            <form className="olc-form">
              <h2 className="olc-form-title">Get Expert Legal Advice</h2>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" placeholder="Enter your email" />
              <label htmlFor="phone">Mobile Number</label>
              <input id="phone" type="tel" name="phone" maxLength="10" placeholder="Enter your mobile number" />
              <label htmlFor="city">Select City</label>
              <input id="city" type="text" placeholder="Enter your city" />
              <label htmlFor="language">Language</label>
              <input id="language" type="text" placeholder="Preferred language" />
              <label htmlFor="problemType">Problem Type</label>
              <input id="problemType" type="text" readOnly placeholder="Select problem type" />
              <button type="submit" className="olc-form-btn">
                Book An Appointment Now
                <img src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="Arrow" width="25" height="25" />
              </button>
              <div className="olc-form-price">
                <span className="olc-form-price-old"><s>₹799</s></span>
                <span className="olc-form-price-new">₹399</span>
                for a 30 min Lawyer Consultation
              </div>
              <div className="olc-form-note">
                <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="Lawyer" width="18" height="18" />
                <span>Experienced lawyers for all legal matters</span>
              </div>
            </form>
          </div> */}
        </div>
        {/* Process Steps (Mobile) */}
        <div className="olc-process-mobile">
          <p className="olc-process-title">Process</p>
          <div className="olc-process-steps">
            <div className="olc-process-step">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Fill Form" />
              <span>Select details</span>
            </div>
            <div className="olc-process-step">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Schedule" />
              <span>Wait for a few minutes</span>
            </div>
            <div className="olc-process-step">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Payment" />
              <span>chat with lawyer</span>
            </div>
            {/* <div className="olc-process-step">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" width="45" height="45" alt="Call" />
              <span>Lawyer Will Call You</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Stats and Reviews Section */}
<div className="olc-stats-section">
  {/* Decorative Banner Image (right corner) */}


  {/* Stats Grid */}
  {/* <div className="olc-stats-bg">
    <div className="olc-stats-grid">
      <div className="olc-stat">
        <p className="olc-stat-value">5,00,000+</p>
        <p className="olc-stat-label">Happy Users</p>
      </div>
      <div className="olc-stat">
        <p className="olc-stat-value">1,00,000+</p>
        <p className="olc-stat-label">Cases Resolved</p>
      </div>
      <div className="olc-stat">
        <p className="olc-stat-value">300+</p>
        <p className="olc-stat-label">Expert Lawyers</p>
      </div>
      <div className="olc-stat">
        <p className="olc-stat-value">50+</p>
        <p className="olc-stat-label">Specialities</p>
      </div>
    </div>

  
    <div className="olc-reviews">
      <div className="olc-review-logo">
        <img
          src="https://assets.vakilsearch.com/live-images/talk-to-expert/google-review-logo.svg"
          alt="Google Reviews"
          width="75"
          height="75"
        />
      </div>
      <div className="olc-review-details">
        <p className="olc-review-title">Google Reviews</p>
        <div className="olc-review-stars">
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/rating-star-full.svg"
            alt="Full Star"
            width="20"
            height="20"
          />
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/rating-star-full.svg"
            alt="Full Star"
            width="20"
            height="20"
          />
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/rating-star-full.svg"
            alt="Full Star"
            width="20"
            height="20"
          />
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/rating-star-full.svg"
            alt="Full Star"
            width="20"
            height="20"
          />
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/rating-star-half.svg"
            alt="Half Star"
            width="20"
            height="20"
          />
          <span className="olc-review-score">4.5/5</span>
          <span className="olc-review-count">18k+ Happy Reviews</span>
        </div>
      </div>
    </div>
  </div> */}
</div>

{/* We Cover Everything You Need Section */}
 <section className="olc-cover-section">
      <h2 className="olc-cover-title">We Cover Everything You Need</h2>
      <div className="olc-cover-slider">
        <button
          className="olc-cover-arrow olc-cover-arrow-left"
          aria-label="Scroll left"
          onClick={handlePrev}
          disabled={page === 0}
          type="button"
        >
          <img
            src="https://assets.vakilsearch.com/live-images/left-blue-icon.svg"
            alt="Left arrow"
            width="40"
            height="44"
          />
        </button>
        <div className="olc-cover-cards">
          {visibleCards.map((card, idx) => (
            <div className="olc-cover-card" key={start + idx}>
              <img
                src={card.img}
                alt={card.title}
                className="olc-cover-card-img"
                loading="lazy"
              />
              <h3 className="olc-cover-card-title">{card.title}</h3>
            </div>
          ))}
        </div>
        <button
          className="olc-cover-arrow olc-cover-arrow-right"
          aria-label="Scroll right"
          onClick={handleNext}
          disabled={page === totalPages - 1}
          type="button"
        >
          <img
            src="https://assets.vakilsearch.com/live-images/right-blue-icon.svg"
            alt="Right arrow"
            width="40"
            height="44"
          />
        </button>
      </div>
    </section>

      <section className="olc-overview-section">
    <div className="olc-overview-flex">
      <div className="olc-overview-content">
        <h2 className="olc-overview-title">Lawyer Consultation - Overview</h2>
        <p className="olc-overview-desc">
          Zolvit offers comprehensive online legal services across India, providing simplified access to expert legal support for individuals and businesses alike. We cover a wide range of legal areas, including family law, property disputes, civil matters, business formation, criminal defense, consumer rights, labor law, constitutional issues, and intellectual property. From the initial consultation to the final resolution, Zolvit ensures a seamless, transparent experience, guiding clients through each step of the legal process. Our expert team offers clear advice, professional document preparation, and strong representation, all while eliminating the usual complexities and legal jargon.
          <br /><br />
          Lawyers, also known as legal representatives, are licensed professionals who specialise in various areas of law, such as advocacy, contract management, real estate transactions, criminal defense, and more. Their primary role is to uphold the law and protect the rights of their clients. Whether you're dealing with a family issue, property dispute, or business challenge, Zolvit's legal experts provide you with the best possible advice and representation, ensuring your legal matters are handled effectively and with care.
        </p>
      </div>
      <div className="olc-overview-video">
        <iframe
          src="https://www.youtube.com/embed/JdczRMl5Cws?si=-XG_ErJmsRWLVXuK"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          width="400"
          height="226"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>

  <section className="olc-panel-section">
      <h2 className="olc-panel-title">Our Panel of Legal Consultants</h2>
      <div className="olc-panel-slider">
        <button
          className="olc-panel-arrow olc-panel-arrow-left"
          aria-label="Previous consultants"
          onClick={handlePrev1}
          disabled={page1 === 0}
          type="button"
        >
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/left-arrow.svg"
            alt="Left arrow"
            width="30"
            height="14"
          />
        </button>
        <div className="olc-panel-cards">
          {visibleConsultants.map((c, idx) => (
            <div className="olc-panel-card" key={c.name}>
              <div className="olc-panel-card-top">
                <img
                  src={c.img}
                  alt={c.name}
                  className="olc-panel-card-img"
                  loading="lazy"
                />
                <div className="olc-panel-card-info">
                  <p className="olc-panel-card-name">{c.name}</p>
                  <p className="olc-panel-card-desc">{c.desc}</p>
                  <p className="olc-panel-card-exp">{c.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="olc-panel-arrow olc-panel-arrow-right"
          aria-label="Next consultants"
          onClick={handleNext1}
          disabled={page1 === totalPages1 - 1}
          type="button"
        >
          <img
            src="https://assets.vakilsearch.com/live-images/talk-to-expert/right-arrow.svg"
            alt="Right arrow"
            width="30"
            height="14"
          />
        </button>
      </div>
    </section>

 <section className="olc-legalrep-section">
    <div className="olc-legalrep-container">
      <h2 className="olc-legalrep-title">Importance of Legal Representation</h2>
      <p className="olc-legalrep-lead">
        Having skilled legal representation ensures your rights are protected and offers expert guidance through complex legal matters. A qualified lawyer provides strategic advice, minimises risks, and strengthens your position in disputes or negotiations. Below are some reasons for hiring a lawyer:
      </p>
      <ul className="olc-legalrep-list">
        {legalPoints.map((point, idx) => (
          <li className="olc-legalrep-listitem" key={idx}>
            <span className="olc-legalrep-dot"></span>
            <span>
              <b>{point.title}</b> {point.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>

  <section className="olc-expertise-section">
    <h2 className="olc-expertise-title">Areas of Legal Expertise</h2>
    <div className="olc-expertise-list">
      {legalExpertise.map((area, idx) => (
        <div className="olc-expertise-card" key={area.title}>
          <img
            src={area.img}
            alt={area.alt}
            className="olc-expertise-img"
            loading="lazy"
          />
          <div className="olc-expertise-content">
            <p className="olc-expertise-area">
              <a href={area.link} target="_blank" rel="noopener noreferrer">
                {area.title}
              </a>
            </p>
            <p className="olc-expertise-desc">{area.description}</p>
            <a href={area.link} target="_blank" rel="noopener noreferrer">
              <button className="olc-expertise-btn">{area.cta}</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>

 <section className="olc-cta-section">
    <div className="olc-cta-container">
      <p className="olc-cta-text">
        Searching for experienced lawyers near me?
        <br />
        Zolvit is the best choice for online legal consultation. Get expert legal guidance tailored to your situation.
      </p>
      <button
        aria-label="Get started"
        className="olc-cta-btn"
      >
        Consult A Lawyer Now
      </button>
    </div>
  </section>

<section className="olc-expertservices-section">
    <h2 className="olc-expertservices-title">
      Our Expert Services For Your Legal Needs
    </h2>
    <p className="olc-expertservices-lead">
      At Zolvit, we provide a comprehensive range of legal services designed to meet all your needs efficiently and effectively. Our team of experienced professionals is dedicated to delivering expert support across various legal matters. Here’s how we can assist you:
    </p>
    <div className="olc-expertservices-grid">
      {expertServices.map((service, idx) => (
        <div className={`olc-service-outer ${service.gradient} ${service.cardRadius}`} key={service.title}>
          <div className={`olc-service-card ${service.cardRadius}`}>
            {idx % 2 === 0 ? (
              <>
                <div className="olc-service-img-wrap">
                  <img src={service.img} alt={service.title} className="olc-service-img" loading="lazy" />
                </div>
                <div className="olc-service-content">
                  <div className={`olc-service-label ${service.labelGradient} ${service.labelRadius}`}>
                    <p>{service.title}</p>
                  </div>
                  <p className="olc-service-desc">{service.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="olc-service-content">
                  <div className={`olc-service-label ${service.labelGradient} ${service.labelRadius}`}>
                    <p>{service.title}</p>
                  </div>
                  <p className="olc-service-desc">{service.description}</p>
                </div>
                <div className="olc-service-img-wrap">
                  <img src={service.img} alt={service.title} className="olc-service-img" loading="lazy" />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>

   <section className="olc-benefits-section">
    <h2 className="olc-benefits-title">Benefits of Online Lawyer Consultation</h2>
    <div className="olc-benefits-wrapper">
      <p className="olc-benefits-lead">
        Online lawyer consultations offer numerous advantages that enhance your legal experience. Here’s how you can benefit:
      </p>
      <div className="olc-benefits-list-bg">
        <div className="olc-benefits-list">
          {onlineBenefits.map((item, idx) => (
            <div className="olc-benefit-card" key={idx}>
              <p className="olc-benefit-title">{item.title}:</p>
              <p className="olc-benefit-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>


 <section className="olc-whyzolvit-section">
    <div className="olc-whyzolvit-container">
      <h2 className="olc-whyzolvit-title">
        Why Choose Zolvit For Online Legal Consultation?
      </h2>
      <p className="olc-whyzolvit-lead">
        Zolvit offers tailored legal support, ensuring that you are connected with experienced lawyers. Whether it be corporate, personal, business, or IP law, we provide access to a network of skilled Lawyers across various niches. Our platform simplifies the process, offering transparent communication, efficient legal counsel, and ongoing support throughout the legal process. Choose Zolvit for comprehensive legal solutions, personalised attention, and a hassle-free experience in securing the best legal consultation for your case.
      </p>
      <div className="olc-whyzolvit-grid">
        {whyZolvitCards.map((card, idx) => (
          <div className="olc-whyzolvit-card" key={idx}>
            <div className="olc-whyzolvit-img-bg">
              <img
                src={card.img}
                alt=""
                className="olc-whyzolvit-img"
                loading="lazy"
              />
              <img
                src="https://assets.vakilsearch.com/live-images/bg.svg"
                alt=""
                className="olc-whyzolvit-bg"
                aria-hidden="true"
                loading="lazy"
              />
            </div>
            <p className="olc-whyzolvit-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>


<section className="olc-cities-section">
    <h2 className="olc-cities-title">
      Online Lawyer Consultations Offered in Other Cities
    </h2>
    <div className="olc-cities-list">
      {cities.map((city) => (
        <a
          className="olc-city-link"
          href={`#${city}`}
          key={city}
        >
          #{city}
        </a>
      ))}
    </div>
  </section>


  <section className="olc-cta-banner-section">
    <div className="olc-cta-banner-container">
      <h3 className="olc-cta-banner-title">
        Get legal advice online anywhere, anytime through Zolvit. Completely easy and online process with no hassles.
      </h3>
      <button
        aria-label="Get started"
        className="olc-cta-banner-btn"
      >
        TALK TO A LAWYER NOW
      </button>
    </div>
  </section>


  <section className="olc-faqs-section">
      <div className="olc-faqs-container">
        <h2 className="olc-faqs-title">FAQs on Lawyer Services</h2>
        <div className="olc-faqs-list">
          {faqs.map((faq, idx) => (
            <div
              className={`olc-faq-card ${openIndex === idx ? "olc-faq-open" : ""}`}
              key={faq.question}
              onClick={() => handleToggle(idx)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleToggle(idx);
              }}
            >
              <div className="olc-faq-question-row">
                <p className="olc-faq-question">{faq.question}</p>
                <span className="olc-faq-icon">
                  <img
                    src={
                      openIndex === idx
                        ? "https://assets.vakilsearch.com/live-images/zolvit-accordion-minus.svg"
                        : "https://assets.vakilsearch.com/live-images/zolvit-accordion-plus.svg"
                    }
                    alt={openIndex === idx ? "accordion-on" : "accordion-off"}
                    width="20"
                    height="20"
                  />
                </span>
              </div>
              {openIndex === idx && (
                <div className="olc-faq-answer" id={`faq-answer-${idx}`}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>


    </section>
    <Footer/>
  </div>

  </div>
)
}

export default Home;

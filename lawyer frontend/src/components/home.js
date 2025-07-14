import React from "react";
import { useRef,useState,useEffect } from "react";
import '../css/OnlineLawyerConsultation.css'; // Uncomment after you add the CSS
import Header from './header';
import Footer from "./footer";
import socket from './socket';
import Swal from 'sweetalert2';
import api from '../api';

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
    title: "Expert Guidance:",
    desc: " A lawyer understands the law and can guide you through complex legal processes.",
  },
  {
    title: "Right Representation:",
    desc: "Whether you're facing a dispute, sending/receiving a legal notice, or filing a complaint — a lawyer ensures your rights are protected. ",
  },
  {
    title: "Risk Reduction:",
    desc: "Avoid costly mistakes or penalties by having a professional represent you. ",
  },
  {
    title: "Peace of Mind:",
    desc: " Knowing you have someone experienced handling your legal matter helps reduce stress. ",
  },
  {
    title: "Better Negotiation:",
    desc: " Lawyers can communicate formally and effectively, often leading to better outcomes.",
  },
 
];


const legalExpertise = [
  {
    title: "Criminal Case ",
    img: "https://assets.vakilsearch.com/consult_civil.svg",
    alt: "Family Lawyer",
    link: "https://www.zolvit.com/lawyers/family",
    description:
      `Criminal cases involve actions that are considered offenses against society or the 
state. These include crimes like theft, assault, fraud, murder, cybercrime, and more. 
A criminal lawyer defends individuals accused of such crimes or helps victims file 
complaints and pursue justice under the Indian Penal Code (IPC). `,
  },
  {
    title: "Civil Case",
    img: "https://assets.vakilsearch.com/consult_property.svg",
    alt: "Property Lawyer",
    link: "https://www.zolvit.com/lawyers/property",
    description:
      `Civil cases deal with personal disputes between individuals or organizations. 
Common civil matters include property disputes, breach of contract, loan recovery, 
defamation, and more. Civil lawyers help in filing suits, sending legal notices, and 
court representation.`
  },
  {
    title: "Family Case",
    img: "https://assets.vakilsearch.com/consult_family.svg",
    alt: "Civil Lawyer",
    link: "https://www.zolvit.com/lawyers/civil",
    description:
     `Family cases include legal issues related to personal relationships such as marriage, 
divorce, child custody, maintenance, domestic violence, and inheritance. A family 
lawyer helps resolve these matters through court or mutual agreement. `
  },
  {
    title: "Corporate Case",
    img: "https://assets.vakilsearch.com/consult_company.svg",
    alt: "Business Lawyer",
    link: "https://www.zolvit.com/lawyers/business",
    description:
      `Corporate legal cases involve legal matters related to companies and business 
operations. This includes company registration, mergers, shareholder disputes, 
regulatory compliance, and corporate fraud. Corporate lawyers work with businesses 
of all sizes.`
  },
  {
    title: "Consumer Case",
    img: "https://assets.vakilsearch.com/consult_criminal.svg",
    alt: "Criminal Lawyer",
    link: "https://www.zolvit.com/lawyers/criminal",
    description:
     `Consumer cases are filed when a consumer faces fraud, poor service, or defective 
products. A consumer lawyer helps you file a complaint in the consumer court and 
ensures your consumer rights are protected.`
  },
  {
    title: "Labour Case",
    img: "https://assets.vakilsearch.com/consult_labour.svg",
    alt: "Consumer Lawyer",
    link: "https://www.zolvit.com/lawyers/consumer",
    description:
    ` Labour or employment cases deal with disputes between employers and employees. 
This includes wrongful termination, unpaid wages, harassment at work, and labor law 
violations. Labour lawyers ensure your rights at the workplace are legally protected.`,
  },
  {
    title: "Cyber Case",
    img: "https://assets.vakilsearch.com/consult_consumer.svg",
    alt: "Labour Lawyer",
    link: "https://www.zolvit.com/lawyers/labour",
    description:
     `Cyber legal cases involve crimes committed using the internet or digital platforms. 
Common examples include online fraud, cyberbullying, hacking, financial scams, 
identity theft, and data breaches. A cyber lawyer helps file complaints and take legal 
action under the IT Act.`
  },
  {
    title: "Property Case",
    img: "https://assets.vakilsearch.com/consult_constitutional.svg",
    alt: "Constitutional Lawyer",
    link: "https://www.zolvit.com/lawyers/constitutional",
    description:
  ` Property cases include land disputes, illegal possession, boundary issues, ancestral 
property conflicts, and builder fraud. A property lawyer helps in title verification, 
property transfer, and litigation.`
  },
  {
    title: "Tax Case",
    img: "https://assets.vakilsearch.com/consult_ip.svg",
    alt: "Intellectual Property (IP) Lawyer",
    link: "https://www.zolvit.com/lawyers/intellectual-property",
    description:
     `Tax cases involve issues with income tax, GST, business tax disputes, or notices 
from tax authorities. A tax lawyer or consultant helps with tax filing, appeals, audits, 
and notices from the Income Tax Department.`
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
    title: "Save Time & Effort",
    desc: " No need to visit chambers or courts just for a consultation.",
  },
  {
    title: "Convenient Access",
    desc: " Talk to a verified lawyer from anywhere using your phone or laptop.",
  },
  {
    title: "Discreet & Confidential",
    desc: " Private legal matters stay private — you choose when and how to talk.",
  },
  {
    title: "Faster Solutions",
    desc: " Quick answers to urgent questions like legal notices, challans, disputes, etc.",
  },
  {
    title: "Affordable Options",
    desc: "Flexible consultation options compared to traditional visits.",
  },
  {
    title: "Wide Choice",
    desc: "Access lawyers from various practice areas — all in one place.",
  },

];



const whyZolvitCards = [
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit1.svg",
    desc: "No waiting, no booking — connect with available lawyers immediately via chat or call.",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit2.svg",
    desc: "From civil and criminal to family, consumer, cyber, and more — we connect you with the right expert. ",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit3.svg",
    desc: "Every lawyer on our platform is verified for qualification and authenticity. ",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit4.svg",
    desc: " Just open the app or website, choose your issue, and talk to a lawyer — it's that simple.",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit5.svg",
    desc: " Access legal support even from remote areas or small towns.",
  },
  {
    img: "https://assets.vakilsearch.com/live-images/whyZolvit6.svg",
    desc: "Your data and conversations stay safe, and pricing (if any) is always shown upfront.",
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
  const[language,setlanguage]=useState('')

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
const languages=[
  {value:'',label:'Select language'},
  {value:'hindi',label:'Hindi'},
  {value:'english',label:'English'},
  {value:'marathi',label:'Marathi'},
  {value:'tamil',label:'Tamil'},
  {value:'bengali',label:'Bengali'},
]


//========================================== chat start=========================================================================


  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const fileInputRef = useRef(null);


const userData = JSON.parse(localStorage.getItem('userDetails'));


  const fetchChatHistory=async()=>
  {
    try {
        const res=await api.get('api/admin/chathistory')
        const result=res.data
        const clientChats = result.filter(
            chat => chat.from === userData.user._id && chat.fromModel === "User"
            );
        setRecentChats(clientChats)
        
    } catch (error) {
        console.log(error);
        
    }
  }
  // Fetch chat history for the logged-in user
  useEffect(() => {
    
    fetchChatHistory()
  }, []);

  // Deduplicate by lawyer ID ("to" field)
const uniqueChatsMap = {};
const uniqueChats = [];
recentChats.forEach(chat => {
  if (!uniqueChatsMap[chat.to]) {
    uniqueChatsMap[chat.to] = true;
    uniqueChats.push(chat);
  }
});



  const iconStyle = { width: 22, height: 22, verticalAlign: 'middle' };



const STATES = [
  { value: '', label: 'Select State' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'tamilnadu', label: 'Tamil Nadu' },
  // ...add more
];


  const [lawyers, setLawyers] = useState([]);
  const [chatLawyer, setChatLawyer] = useState(null);
  const [onlineLawyers, setOnlineLawyers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageMap, setMessageMap] = useState({});

  const fetchlawyers = async () => {
    try {
      const resp = await api.get('api/lawyer/getalllawyerprofile');
      setLawyers(resp.data.filter((item) => (item.status === "verified")));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchlawyers();
  }, []);

  const getLawyerById = (id) => lawyers.find(lawyer => lawyer._id === id);

    // Filter lawyers based on search
const filterLawyersAndChat = () => {
   
  if(!userData?.user._id)
  {
     return Swal.fire({
      icon:"error",
      title:"Login!!!",
      text:"Please Login first",
      showConfirmButton:"true"
    })
  }
   setIsLoading(true)
     setTimeout(() => {
    setIsLoading(false);
  
      // Filter lawyers by specialization and state
  let filtered = lawyers;

  if (specialization) {
    filtered = filtered.filter(lawyer =>
      Array.isArray(lawyer.specializations)
        ? lawyer.specializations.some(
            spec =>
              spec.label &&
              spec.label.toLowerCase().includes(specialization.toLowerCase())
          )
        : (lawyer.specializations?.label || lawyer.specializations || '')
            .toLowerCase()
            .includes(specialization.toLowerCase())
    );
  }

    if (language) {
    filtered = filtered.filter(lawyer =>
      Array.isArray(lawyer.languages)
        ? lawyer.languages.some(
            spec =>
              spec.label &&
              spec.label.toLowerCase().includes(language.toLowerCase())
          )
        : (lawyer.languages?.label || lawyer.languages || '')
            .toLowerCase()
            .includes(language.toLowerCase())
    );
  }

  if (court) {
    filtered = filtered.filter(lawyer =>
      Array.isArray(lawyer.practicingcourts)
        ? lawyer.practicingcourts.some(
            spec =>
              spec.label &&
              spec.label.toLowerCase().includes(court.toLowerCase())
          )
        : (lawyer.practicingcourts?.label || lawyer.practicingcourts || '')
            .toLowerCase()
            .includes(court.toLowerCase())
    );
  }

  // Try to find an online lawyer from filtered list, random order
  let candidates = [...filtered];
  while (candidates.length > 0) {
    const idx = Math.floor(Math.random() * candidates.length);
    const candidate = candidates[idx];
    if (onlineLawyers.includes(candidate._id)) {
      handleOpenChat(candidate);
      return;
    }
    candidates.splice(idx, 1); // Remove tried candidate
  }

  // If no online lawyer found in filtered, pick any online lawyer
  const onlineLawyerObjs = lawyers.filter(lawyer =>
    onlineLawyers.includes(lawyer._id)
  );
  if (onlineLawyerObjs.length > 0) {
    const randomLawyer =
      onlineLawyerObjs[Math.floor(Math.random() * onlineLawyerObjs.length)];
    handleOpenChat(randomLawyer);
  } else {
    Swal.fire({
        icon:"info",
        title:"Search result...",
        text:"No lawyers available.",
        showConfirmButton:"true"
    })
    
  }

  }, 2000);

};





    useEffect(() => {
    if (!userData?.user._id) return;

    if (!socket.connected) socket.connect();

    socket.on('connect', () => {
      console.log('✅ Connected (client):', socket.id);
      socket.emit('clientOnline', userData.user._id);
      socket.emit('getOnlineLawyers');
    });

    socket.on('onlineLawyersList', (ids) => {
      console.log('✅ Received online lawyers:', ids);
      setOnlineLawyers(ids);
    });

    socket.on('updateOnlineUsers', (ids) => {
      setOnlineLawyers(ids);
    });

    socket.on('receiveMessage', ({ from, message }) => {
      if (chatLawyer?._id === from) {
        setMessages((prev) => [...prev, { text: message, isMe: false }]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
      socket.off('onlineLawyersList');
      socket.off('updateOnlineUsers');
    };
  }, [userData?.user._id, chatLawyer]);

  const handleSendMessage = (text) => {
    if (!text.trim() || !chatLawyer?._id) return;

    if (containsSensitiveInfo(text)) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Allowed 🚫',
        text: 'Sharing mobile numbers or emails is not permitted!',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
    
     const timestamp = new Date().toISOString();

    socket.emit('privateMessage', {
      toUserId: chatLawyer._id,
      message: text,
      fromUserType: 'client',
      timestamp
    });

    setMessages((prev) => [...prev, { text, isMe: true,timestamp  }]);
  };

    const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !chatLawyer?._id) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/api/admin/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const fileUrl = res.data.url;
      const fileType = file.type;

      socket.emit('privateMessage', {
        toUserId: chatLawyer._id,
        message: '',
        fileUrl,
        fileName: file.name,
        fileType,
        fromUserType: 'client'
      });

      setMessages((prev) => [
        ...prev,
        { text: '', fileUrl, fileName: file.name, fileType, isMe: true }
      ]);
    } catch (err) {
      alert('Upload failed');
    }
    setIsLoading(false);
  };


  
  const handleOpenChat = async (lawyer) => {
    const isOnline = onlineLawyers.includes(lawyer._id);
    setChatLawyer({ ...lawyer, isOnline });

    const clientId = userData.user._id;
    const lawyerId = lawyer._id;

    try {
      const res = await api.get(`api/admin/chathistory/${clientId}/${lawyerId}`);
      const data = await res.data;

      let formatted = data.map(msg => ({
        text: msg.message,
        isMe: msg.from === clientId,
        isSystem: false,
        fileUrl:msg.fileUrl,
        fileName:msg.fileName, 
        fileType:msg.fileType
      }));

      if (formatted.length === 0) {
        const systemMessage = {
          text: `You are now connected to Advocate ${lawyer.firstName} ${lawyer.lastName} who practices in ${lawyer.practicingcourts.map((item)=>item.label).join(',')} Courts and specializes in ${lawyer.specializations.map((item)=>item.label).join(',')}, With ${lawyer.yearsOfExperience} of experience. Feel free to share your concern or upload documents securely`,
          isSystem: true,
          isMe: false,
        };
        formatted = [systemMessage];
      }

      setMessages(formatted);
      setMessageMap(prev => ({ ...prev, [lawyerId]: formatted }));
    } catch (err) {
      console.error('❌ Error fetching chat history:', err);
    }
  };

  function containsSensitiveInfo(text) {
    const phoneRegex = /(?:\+91[\s-]?)?[6-9]\d{9}/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i;
    return phoneRegex.test(text) || emailRegex.test(text);
  }

  const [isFlipping, setIsFlipping] = useState(false);

const handleSwapLawyer = async () => {

setIsLoading(true)
  // Wait for the first half of the flip
  setTimeout(async () => {
      setIsFlipping(true); // Start flip
      setIsLoading(false)
    const availableOnlineLawyers = lawyers.filter(
      (lawyer) => onlineLawyers.includes(lawyer._id) && lawyer._id !== chatLawyer._id
    );

    if (availableOnlineLawyers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Other Lawyers Online',
        text: 'Sorry, there are no other online lawyers to swap with right now.',
        timer: 2500,
        showConfirmButton: false,
      });
      setIsFlipping(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableOnlineLawyers.length);
    const newLawyer = availableOnlineLawyers[randomIndex];

    await handleOpenChat(newLawyer);

    // End flip after the second half
    setTimeout(() => setIsFlipping(false), 300); // 300ms for the second half
  }, 2000); // 300ms for the first half
};




//====================================================== chat end===================================================================




    return(
<div>
      <Header/>
  <div className="olc-root">

    <section className="olc-banner-bg" style={{marginTop:"10px"}}>
      <div className="olc-banner" id="main-banner">
       
        <div className="olc-banner-content">
          {/* Left: Headline and Benefits */}
          <div className="olc-banner-left">
         <div className="olc-process-desktop">
              <p className="olc-process-title">Process</p>
             <div className="olc-process-steps">
  <div className="olc-process-step">
     <span style={{ fontSize: '32px' }}>📝</span>
    <span>Select details</span>
  </div>
  <div className="olc-process-step">
    <span style={{ fontSize: '32px' }}>⏳</span>
    <span>Wait for a few minutes</span>
  </div>
  <div className="olc-process-step">
    <span style={{ fontSize: '32px' }}>💬</span>
    <span>Chat with lawyer</span>
  </div>
</div>

            </div>

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
       <select
      value={court}
      onChange={e => setlanguage(e.target.value)}
      className="findlawyer-select"
    >
      {languages.map(st => (
        <option key={st.value} value={st.value}>
          {st.label}
        </option>
      ))}
    </select>
    <button
      className="action-btn findlawyer-btn"
      title="Chat Now"
      onClick={filterLawyersAndChat}
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
     <span style={{ fontSize: '32px' }}>📝</span>
    <span>Select details</span>
  </div>
  <div className="olc-process-step">
    <span style={{ fontSize: '32px' }}>⏳</span>
    <span>Wait for a few minutes</span>
  </div>
  <div className="olc-process-step">
    <span style={{ fontSize: '32px' }}>💬</span>
    <span>Chat with lawyer</span>
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
 {/* <section className="olc-cover-section">
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
    </section> */}

      {/* <section className="olc-overview-section">
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
  </section> */}

  {/* <section className="olc-panel-section">
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
    </section> */}

    <section class="legal-queries-section">
  <h2 class="section-title">Most Asked Legal Queries</h2>
  <div class="queries-grid">
    <div class="query-card">
      <span class="query-icon">🚗</span>
      <h3>Car Challan</h3>
      {/* <p>Information and help regarding traffic fines and challans.</p> */}
    </div>
    <div class="query-card">
      <span class="query-icon">📄</span>
      <h3>Legal Notice</h3>
      {/* <p>Drafting and responding to legal notices efficiently.</p> */}
    </div>
    <div class="query-card">
      <span class="query-icon ">💸</span>
      <h3>Cheque Bounce</h3>
      {/* <p>Guidance on cheque bounce cases and legal remedies.</p> */}
    </div>
    <div class="query-card">
      <span class="query-icon">📦</span>
      <h3>Product/Service Default</h3>
      {/* <p>Assistance for faulty products or unsatisfactory services.</p> */}
    </div>
    <div class="query-card">
      <span class="query-icon">🕵️</span>
      <h3>Online Fraud</h3>
      {/* <p>Support for victims of cyber fraud and scams.</p> */}
    </div>
  </div>
</section>

<section class="lawyer-help-section">
  <h2 class="help-title">Not sure which type of lawyer you need?</h2>
  <p class="help-desc">
    No problem! <a href="https://www.google.com/" target="_blank" class="google-link">Click here</a> and type the following:<br></br>
    <span class="help-template">"My legal issue is [your case]. What category of lawyer do I need — criminal, civil, family, corporate, consumer, labour, or cyber?"</span>
  </p>
  <div class="help-example">
    <strong>Example:</strong><br></br>
    My legal issue is my employer is not paying my salary. What category of lawyer do I need — criminal, civil, family, corporate, consumer, labour, or cyber?
  </div>
  {/* <div class="lawyer-types-table-responsive">
    <table class="lawyer-types-table">
      <thead>
        <tr>
          <th>Lawyer Type</th>
          <th>What They Cover</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Criminal</td>
          <td>Defending or prosecuting criminal charges (theft, assault, fraud, etc.)</td>
        </tr>
        <tr>
          <td>Civil</td>
          <td>Property disputes, breach of contract, damages, torts, general non-criminal matters</td>
        </tr>
        <tr>
          <td>Family</td>
          <td>Divorce, child custody, alimony, adoption, domestic violence</td>
        </tr>
        <tr>
          <td>Corporate</td>
          <td>Business formation, mergers, acquisitions, compliance, contracts, shareholder disputes</td>
        </tr>
        <tr>
          <td>Consumer</td>
          <td>Product/service complaints, consumer fraud, unfair trade practices, warranty issues</td>
        </tr>
        <tr>
          <td>Labour</td>
          <td>Employment disputes, unpaid salary, wrongful termination, workplace harassment</td>
        </tr>
        <tr>
          <td>Cyber</td>
          <td>Online fraud, hacking, data breaches, cyberbullying, digital privacy</td>
        </tr>
      </tbody>
    </table>
  </div> */}
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
            {/* <a href={area.link} target="_blank" rel="noopener noreferrer">
              <button className="olc-expertise-btn">{area.cta}</button>
            </a> */}
          </div>
        </div>
      ))}
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

 

 {/* <section className="olc-cta-section">
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
  </section> */}

{/* <section className="olc-expertservices-section">
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
  </section> */}

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
        Why Choose Counvo For Online Legal Consultation?
      </h2>
      <p className="olc-whyzolvit-lead">
        Counvo offers tailored legal support, ensuring that you are connected with experienced lawyers. Whether it be corporate, personal, business, or IP law, we provide access to a network of skilled Lawyers across various niches. Our platform simplifies the process, offering transparent communication, efficient legal counsel, and ongoing support throughout the legal process. Choose Zolvit for comprehensive legal solutions, personalised attention, and a hassle-free experience in securing the best legal consultation for your case.
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


{/* <section className="olc-cities-section">
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
  </section> */}


  {/* <section className="olc-cta-banner-section">
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
  </section> */}


  {/* <section className="olc-faqs-section">
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
    </section> */}



{/*========================================= chat section start============================================================= */}
      <style>{`

  .lawyers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .lawyer-card {
          background: #f9fafb;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .lawyer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.15);
          background: white;
        }

        .lawyer-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #3b82f6;
          margin: 0 auto 1rem;
        }

        .lawyer-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .lawyer-status {
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .lawyer-details {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .lawyer-actions {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .action-btn {
          background: white;
          color:blue;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: #f3f4f6;
          transform: translateY(-1px);
        }
        .chat-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          font-size: 0.875rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .message.sent {
          align-self: flex-end;
          background: #3b82f6;
          color: white;
        }

        .message.received {
          align-self: flex-start;
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
        }

        .message.system {
          align-self: center;
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #bfdbfe;
          text-align: center;
          font-style: italic;
        }

        .chat-input {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .chat-input input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .chat-input input:focus {
          border-color: #3b82f6;
        }

  
    @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .time-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .lawyers-grid {
            grid-template-columns: 1fr;
          }

          .chat-popup {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            bottom: 10px;
            right: 10px;
            left: 10px;
          }
              @media (max-width: 1024px) {
    .lawyers-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    .chat-popup {
      width: 320px;
      height: 450px;
    }
  }

  @media (max-width: 480px) {
  .main1{
      margin-left:0px
      }
    .lawyers-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .chat-popup {
      width: 100vw;
      height: 100vh;
      bottom: 0;
      right: 0;
      left: 0;
      border-radius: 0;
    }
    .chat-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    .chat-input input {
      font-size: 1rem;
    }
    select {
      min-width: 100% !important;
    }
    .action-btn {
      width: 100%;
      justify-content: center;
    }
    .main1 > div {
      padding: 20px 16px !important;
    }
      
        
      `}</style>

  {/* Chat Popup */}

      {chatLawyer && (
        <div className={`chat-popup${isFlipping ? ' flip' : ''}`}>
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={chatLawyer.profilepic}
                alt="profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid white',
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {chatLawyer.firstName} {chatLawyer.lastName}
                  {/* <span style={{fontSize:"10px",color:"lightgray",fontWeight:"normal"}}>
                    {chatLawyer.yearsOfExperience}years of experience</span> */}
                 

                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  {chatLawyer.isOnline ? '🟢 Online' : '🔴 Offline'}
                </div>
              </div>
            </div>
            <div className="header-actions">
        <button
        onClick={handleSwapLawyer}
           style={{
                background: 'none',
                border:"1px solid lightgray",
                color: 'black',
                fontSize: '12px',
                cursor: 'pointer',
              }}
        
          title="Switch Lawyer"
        >
          Switch
          {/* <span style={{fontSize:"14px"}}>switch</span> */}
        </button>
        <button
           style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
              }}
          onClick={() => setChatLawyer(null)}
          title="Close Chat"
        >
          ✖
        </button>
      </div>
            {/* <button
              onClick={() => setChatLawyer(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >✖</button> */}
          </div>

        <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.isMe ? 'sent' : 'received'}`}>
            {msg.text}
            {msg.fileUrl && (
              msg.fileType && msg.fileType.startsWith('image/') ? (
                <img src={msg.fileUrl} alt={msg.fileName} style={{ maxWidth: 150, maxHeight: 150 }} />
              ) : (
                <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                  📄 {msg.fileName}
                </a>
              )
            )}
       <div style={{ fontSize: '10px', color: 'black', marginTop: '2px', textAlign: msg.isMe ? 'right' : 'left' }}>
      {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : ''}
    </div>
  </div>
))}
      </div>

          <div className="chat-input">
            <input
    type="file"
    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    ref={fileInputRef}
    style={{ display: 'none' }}
    onChange={handleFileChange}
  />
            <input
              type="text"
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleSendMessage(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
   <button
  type="button"
  onClick={() => fileInputRef.current.click()}
  style={{
    position: 'absolute',
    right: '25px',
    top: '93%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'gray',
    fontSize: '20px',
    cursor: 'pointer',
    padding: 0,
    margin: 0
  }}
  title="Attach Document"
  tabIndex={-1}
>
  🗂️
</button>

          </div>
        </div>
      )}

    </section>
    <Footer/>
  </div>

   {isLoading && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.5)",
      backdropFilter: "blur(8px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        padding: "40px 60px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(80,120,220,0.10)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "6px solid #e0e7ff",
          borderTop: "6px solid #6366f1",
          borderRadius: "50%",
          width: 60,
          height: 60,
          animation: "spin 1s linear infinite",
          marginBottom: 16,
        }}
      />
      <span style={{ color: "#6366f1", fontSize: 18, fontWeight: 600 }}>
        Connecting you to a lawyer...
      </span>
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}
      </style>
    </div>
  </div>
)}

  </div>
)
}

export default Home;

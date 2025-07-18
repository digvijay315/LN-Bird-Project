import React, { useEffect, useState } from 'react'
import api from '../api'
import Adminsidebar from './adminsidebar'
import '../css/allchat.css'
function Allchat() {

    const[allchat,setallchat]=useState([])
     const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);

    const getallchat=async()=>
    {
        try {
            const resp=await api.get('api/admin/chathistory')
            setallchat(resp.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>
    {
        getallchat()

    },[])
  
  
        console.log(allchat);
    // You may need to fetch the user and lawyer info such as name/pic via API mapping or attach it to the messages.

function groupByConversation(messages) {
  const convMap = {};

  messages.forEach(msg => {
    let user, lawyer;

    // find who is user and who is lawyer for this msg
    if (msg.fromModel === "User") {
      user = msg.from;
      lawyer = msg.to;
    } else {
      user = msg.to;
      lawyer = msg.from;
    }
    if (!user || !lawyer) return; // Defensive (shouldn't happen if populated)

    const key = user._id + "|" + lawyer._id;
    if (!convMap[key]) {
      convMap[key] = {
        user,
        lawyer,
        messages: []
      };
    }
    convMap[key].messages.push(msg);
  });

  // Sort messages by timestamp for each conversation
  Object.values(convMap).forEach(conv =>
    conv.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  );

  return Object.values(convMap);
}


 useEffect(() => {
    setConversations(groupByConversation(allchat));
  }, [allchat]);
      console.log(conversations);
  return (
    <div>
        <Adminsidebar/>
       <div style={{ display: "flex" }}>
      <div className="allchat-main">
        <h2>All Chat History</h2>
        <div className="allchat-card-list">
          {conversations.map((conv, idx) => (
            <div className="chat-card" key={idx} onClick={() => setSelectedConv(conv)}>
              <div className="chat-profile">
                <img
                  src={
                    conv.user?.profilepic||
                    "https://ui-avatars.com/api/?background=ff0879&color=fff&name=" +
                      (conv.user?.fullName || "Client")
                  }
                  className="profile-pic"
                  alt="User"
                />
                <div>{conv.user?.fullName || "Client"}</div>
              </div>
              <div className="chat-profile">
                <img
                  src={
                    conv.lawyer?.profilepic||
                    "https://ui-avatars.com/api/?background=5b7fff&color=fff&name=" +
                      (conv.lawyer?.firstName || "Lawyer")
                  }
                  className="profile-pic"
                  alt="Lawyer"
                />
                <div>{conv.lawyer?.firstName || "Lawyer"}</div>
              </div>
              <div className="total-msg">
                {conv.messages.length} Messages
              </div>
              <button className="view-btn" onClick={e => (e.stopPropagation(),setSelectedConv(conv))}>
                View
              </button>
            </div>
          ))}
        </div>

        {selectedConv && (
          <div className="chat-modal-overlay" onClick={() => setSelectedConv(null)}>
            <div className="chat-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <span>
                  <b>
                    {selectedConv.userInfo?.name || "Client"} <span style={{ color: "#777" }}>with</span>{" "}
                    {selectedConv.lawyerInfo?.name || "Lawyer"}
                  </b>
                </span>
                <button className="close-btn" onClick={() => setSelectedConv(null)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {selectedConv.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={
                      "msg-row " +
                      (msg.fromModel === "User" ? "msg-client" : "msg-lawyer")
                    }
                  >
                    <div className="msg-bubble">
                      {msg.message}
                      <span className="msg-time">
                        {new Date(msg.timestamp).toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Allchat

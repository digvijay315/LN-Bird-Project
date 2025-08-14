import React, { useState } from 'react'

const MedicalTabSlider = () => {
    const [activeTab, setActiveTab] = useState('tab1');
  return (
      <>
        <div className=" mb-4 medical-tab-buttons"> 
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab1')}>
                        Cardiology
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab2')}
                        >
                        Orthopedics
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab3')}
                        >
                        Pediatrics
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab4')}
                        >
                        Neurology
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab5')}
                        >
                        Obstetrics & Gynecology
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab6')}
                        >
                        Otorhinolaryngology
                    </button>
                    <button className={`flex-1 py-2 cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'lightBg' }`}
                        onClick={()=> setActiveTab('tab7')}
                        >
                        Plastic & Reconstructive Surgery
                    </button>
                 </div>
      </>
  )
}

export default MedicalTabSlider
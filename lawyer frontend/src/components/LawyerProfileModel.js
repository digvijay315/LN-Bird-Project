import React from 'react';

const LawyerProfileModal = ({ onClose, userDetails, loading }) => {
    console.log('Profile data:', userDetails);
    
    if (!userDetails) return null;

    return (  
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: '12px',
                    width: '400px',
                    padding: '30px 25px',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                }}
            >
                <h2
                    style={{
                        marginBottom: '20px',
                        fontSize: '22px',
                        textAlign: 'center',
                        color: '#1e2a78',
                    }}
                >
                    Lawyer Profile
                </h2>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        Loading profile...
                    </div>
                ) : (
                    <div style={{ lineHeight: '1.8', fontSize: '16px', minHeight: '200px' }}>
                        <p><strong>Name:</strong> 
                            {(userDetails.firstName || 'Not provided') + ' ' + (userDetails.lastName || '')}
                        </p>
                        <p><strong>Email:</strong> {userDetails.email || 'Not provided'}</p>
                        <p><strong>Phone:</strong> {userDetails.phone || 'Not provided'}</p>
                        <p><strong>Bar ID:</strong> {userDetails.barRegistrationNumber || 'Not provided'}</p>
                        <p><strong>Experience:</strong> {userDetails.yearsOfExperience || '0'} years</p>
                        <p><strong>Specialization:</strong> 
                            {Array.isArray(userDetails.practiceAreas) && userDetails.practiceAreas.length > 0
                                ? userDetails.practiceAreas.join(', ')
                                : 'Not specified'}
                        </p>
                    </div>
                )}

                <div
                    style={{
                        marginTop: '25px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#ccc',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        Close
                    </button>

                    <button
                        onClick={() => alert('Edit functionality coming soon!')}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#1e2a78',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LawyerProfileModal;
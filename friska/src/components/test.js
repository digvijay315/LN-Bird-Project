import React, { useState } from 'react';
import axios from 'axios';
import Login from './login';

const AzureAIComponent = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const endpoint = "https://friskaai-ml-space-hiycz.eastus2.inference.ml.azure.com/score";
    const apiKey = "PUqBOZXczfPbr0uXJtcKV9CGnxVPqAyK";

    const callAzureAI = async () => {
        try {
            const response = await axios.post(endpoint, {
                messages: [{ role: "user", content: "Hello, how are you?" }],
                max_tokens: 50
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey
                }
            });
                console.log(response);
                
            // Set the response data to state
            setResponseData(response.data);
            setError(null);  // Clear any previous errors
        } catch (err) {
            // Set the error message if the request fails
            setError(err.response ? err.response.data : err.message);
            setResponseData(null); // Clear any previous successful responses
        }
    };

    return (
        <div>
            <button onClick={callAzureAI}>Call Azure AI</button>

            {/* Display response data */}
            {responseData && (
                <div>
                    <h3>Response from Azure AI:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}

            {/* Display error if any */}
            {error && (
                <div style={{ color: 'red' }}>
                    <h3>Error:</h3>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AzureAIComponent;

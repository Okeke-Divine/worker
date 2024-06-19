const express = require('express');
const axios = require('axios');

const app = express();

// Example URLs to request
const url1 = 'http://localhost:4000';
const url2 = 'https://crypto-wallet-bruteforce-main.onrender.com/deploy';

// Function to make requests to URLs using the custom axios instance
const axiosInstance = axios.create({
    validateStatus: () => true, // Treat all statuses as successful
});

async function makeRequests() {
    console.log("Sending requests");
    try {
        const response1 = await axios.get(url1);
        console.log('(URL 1) Requests made successfully:', response1.data);
    } catch (error) {
        console.error('(URL 1) Error making requests:', error.message);
    }

    try {
        const response2 = await axiosInstance.get(url2);
        console.log('(URL 2) Requests made successfully:', response2.data);
    } catch (error) {
        console.error('(URL 2) Error making requests:', error.message);
    }
}


// Route to handle incoming requests (optional)
app.get('/', (req, res) => {
    res.send('Express app is running!');
});

app.get("/deploy", (req,res) => {
    res.send("Deployed")
    makeRequests()
    // Schedule subsequent requests after 1 minute
    setInterval(makeRequests, 60000); 
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

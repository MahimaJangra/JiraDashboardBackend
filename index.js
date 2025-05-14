const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    // {
    // origin: 'http://localhost:5173',
    // credentials: true
    // },
    {
        origin: 'https://jira-dashboard-frontend-kappa.vercel.app',//'http://localhost:5173',
        credentials: true
    }));
app.use(express.json());

app.post('/login', async (req, res) => {
    try {
        const {email, token}= req.body;
        // console.log("email--",email);
        // console.log("token--",token);
        const url= email.split("@")[0]; //TODO -verify email before split
        console.log(url)
        const response = await axios.get(`https://${url}.atlassian.net/rest/api/3/project`, 
            {
            auth: {
                username: email,
                password: token
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        // console.log(response);
        // console.log("data==============");
        // console.log(response.data);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
}
);

app.post('/:projectKey/issues',async(req, res)=>{
    try{
        const {projectKey}= req.params;
        const {email, token}= req.body;
        console.log("server project Key received-", {projectKey})
        const response= await axios.get(`https://${url}.atlassian.net/rest/api/3/search?jql=project=${projectKey}`,{
            auth: {
                username: email,
                password: token
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        // console.log("there");
        res.json(response.data);
    }
    
    catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Failed to fetch issues' });
    }
}
)

app.listen(PORT,()=> {
    console.log(`listening to port ${PORT}`)
})

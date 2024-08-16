import express from 'express';
import cors  from 'cors';
import generatePost from './gemini/gemini.js';


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {


  res.send('Hello World');
});

app.post('/generate', async (req, res) => {
  const data = req.body;
  // console.log(data);
  try {
    const result = await generatePost(data.theme); 
    res.send(result);  
  } catch (error) {
    
    res.status(500).send(error.message);
  }
});


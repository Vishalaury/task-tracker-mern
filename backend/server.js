// const dotenv = require('dotenv');
// const connectDB = require('./src/config/db');
// const app = require('./src/app');

// dotenv.config();
// connectDB();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const app = require('./src/app');

dotenv.config();
connectDB();


app.get('/', (req, res) => {
    res.send('Task Tracker API is running perfectly on Render!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
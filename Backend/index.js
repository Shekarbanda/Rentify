const connectDatabase = require('./config/db.js')
// const swagger = require('./config/swagger.js');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const multer = require('multer');
const bodyParser = require("body-parser");

dotenv.config()
const app = express();
const userRoute = require('./routes/userRoute.js');
const authRoute = require('./routes/authRoute.js');
const itemRoute = require('./routes/ItemRoute.js');

const { authMiddleware } = require('./middleware/authMiddleware.js');

connectDatabase();
// // swagger(app);
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3000', 'https://rentify-furd.onrender.com']
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }),
)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(upload.any());
app.use(bodyParser.json({ limit: "100mb" })); 
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true })); 

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', authMiddleware, userRoute);
app.use('/api/v1/item', itemRoute);

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server started at Port ${port}`);
})
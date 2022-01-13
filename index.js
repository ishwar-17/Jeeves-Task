const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

const db = require("./server/models");
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
		process.exit();
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

require("./server/routes/PropertyRoutes/property.routes")(app);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
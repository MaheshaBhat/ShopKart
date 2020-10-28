const express = require('express');
const homeRouter = require('./route/index');
const cors = require('cors');
const app = express();

const PORT = 3000;
app.use('*', cors());
app.use("/api/home", homeRouter);

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})

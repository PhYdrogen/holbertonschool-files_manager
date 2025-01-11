const express = require('express');
const router = require('./routes/index').default;

const app = express();
const port = 5001;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

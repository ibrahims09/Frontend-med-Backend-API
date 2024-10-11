const express = require('express');
const contentRoutes = require('./src/routes/content');

const app = express();
app.use(express.json());
app.use('/api', contentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

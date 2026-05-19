import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Admin Service running on port ${PORT}`);
});

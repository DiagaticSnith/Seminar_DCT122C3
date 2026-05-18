import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT as number, '0.0.0.0', () => {
  console.log(`Identity Service running on port ${PORT}`);
});

// Keep process alive if it's exiting prematurely
setInterval(() => {}, 1000 * 60 * 60);

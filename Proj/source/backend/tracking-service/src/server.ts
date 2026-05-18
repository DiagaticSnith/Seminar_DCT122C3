import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3002;

app.listen(PORT as number, '0.0.0.0', () => {
  console.log(`Tracking Service running on port ${PORT}`);
});

// Keep process alive
setInterval(() => {}, 1000 * 60 * 60);

import app from './app';
import config from './app/cofig';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://rafi:rafi005@cluster0.mqo07.mongodb.net/express-assignment-2?retryWrites=true&w=majority',
    );
    app.listen(config.port, () => {
      console.log('App is listening port', config.port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

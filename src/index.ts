import { Knex } from './database/knex';
import { server } from './server/Server';


const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`Server running in port ${process.env.PORT || 3333}`);
  });
};


if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Running migrations...');

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed.run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
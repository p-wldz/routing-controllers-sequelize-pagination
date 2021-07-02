import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import sequelize from './database/db-connection'
const app = createExpressServer({
  cors: false,
  controllers: [`${__dirname}/controllers/**/*{.controller.js,.controller.ts}`],
})

app.use(bodyParser.json())

sequelize.authenticate().then(() => {
  console.log("Connected to DB.");
}).catch(err => {
  console.log("Cannot run DB. ", err);
});




export default app
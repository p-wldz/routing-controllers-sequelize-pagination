import sequelize from "./db-connection";

sequelize.authenticate().then(success => {
    console.log("Connected to DB.");
    sequelize.sync({
        alter: true
    }); 
}).catch(err => {
    console.log("Cannot run DB. ", err);
});
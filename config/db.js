const mongoose = require('mongoose')

exports.connectToDB = async () =>{
        await mongoose.connect("mongodb://localhost/NEPreparation", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((response)=>{
        console.log('MongoDB connected successfully');
    })
    .catch((error)=>{
        console.log(`Error while connecting to mongoDB ${error}`);
    })
}
exports.disconnectFromDB = ()=>{
    mongoose.connection.close();
}



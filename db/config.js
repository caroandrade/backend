const mongoose = require('mongoose');


const dbConection = async  () => {
    try{
        await mongoose.connect(process.env.DB_Conettion);
    
    console.log('conección ok')
    } catch(error){
        console.Console(error);
        throw new Error('Erro a la hora de iniiciar la BD ver log')
    }
   



    
}

module.exports={
    dbConection
}

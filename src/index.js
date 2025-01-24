import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js';

dotenv.config({
    path: './env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    });

})
.catch((error) => {
    console.log("Mongo db connection failed", error);

});











// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
//         app.on("error", (error) => {
//             console.log("Err", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })()

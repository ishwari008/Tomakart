import mongoos from "mongoose";

 export const connectDB = async () =>{
    await mongoos.connect('mongodb+srv://ishwarii_foodweb:7760246986@cluster0.flc43yl.mongodb.net/food-dalivary').then(()=>console.log("db connected"));
}
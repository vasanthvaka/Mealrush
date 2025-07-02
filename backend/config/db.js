import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://vsvaka22:vsvaka1022@cluster0.1q55wqz.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}

import exp from 'express';
const app = exp();
import ExpUser from './UserSchema.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("localhost:5173/api/register",async(req,res)=>{
    try{

        const res=new ExpUser(req.body)
        const userSave=res.save()
    }
    catch(error){
      console.log(error)
    }
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

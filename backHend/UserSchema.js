import M from 'mongoose'
const user=M.Schema({
    username: { type: String, required: true,unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
})
const ExpUser=M.model('User',user)
export default ExpUser
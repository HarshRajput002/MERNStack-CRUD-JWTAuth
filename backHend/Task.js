import M from 'mongoose';
const task=new M.Schema({
    userId: { type: M.Schema.Types.ObjectId, ref: 'User', required: true },
    task:{type:String,require:true},
    details:{type:String}
})
const expTask=M.model('Tasks',task)
export default expTask;
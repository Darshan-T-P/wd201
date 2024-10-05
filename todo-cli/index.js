/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {connect}=require("./connectDB.js");
const Todo=require("./TodoModel.js");

const createTodo=async()=>{
    try{
        await connect();
        const todo=await Todo.addTask({
            title:"Second  Item",
            dueDate:new Date(),
            completed:false,
        });
        console.log(`Created Todo with Id ${todo.id}`);       
    }
    catch(error){
        console.error(error);
    }
};


const countItems=async()=>{
    try{
        const totalcount= await Todo.count();
        console.log(`Found ${totalcount} items in the table`);
    } catch(error){
        console.error(error);        
    }
}

const getAllTodo=async()=>{
    try{
        const todos=await Todo.findAll({
            order:[['id','Asc']]
        });
        const todoList=todos.map(todo=>todo.displayableString()).join("\n");
        console.log(todoList);
        
    } catch(error){
        console.error(error);        
    }
}

const getsingleTodo=async()=>{
    try{
        const todo=await Todo.findOne({
            where:{
                completed:false
            },
            order:[['id','desc']]
        });
        console.log(todo.displayableString());
        
    } catch(error){
        console.error(error);        
    }
}

const updateItem=async(id)=>{
    try{
        await Todo.update({completed:true},{
            where:{
                id:id,
            }
        })
    } catch(error){
            console.error(error);            
    }
}

const deleteItem=async(id)=>{
    try{
        const deleteRowCount=await Todo.destroy({
            where:{
                id:id,
            }
        })
        console.log(`Deleted ${deleteRowCount} row!`);        
    } catch(error){
        console.error(error);        
    }
}

(async ()=>{
    //await createTodo();
    //await countItems();
    await getAllTodo();
    //await getsingleTodo();
    //await updateItem(2);
    await deleteItem(3);
    await getAllTodo();
})();
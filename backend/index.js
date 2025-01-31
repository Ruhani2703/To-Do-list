const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require("./db")
const app = express()
const cors = require("cors");
const port = 3000;


app.use(express.json());
app.use(cors({
    origin: '*', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.post("/todo" , async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs",
        })
        return ;
    }
    await todo.create({
        title : createPayload.title,
        description: createPayload.description,
        completed : false
    })

    res.json({
        msg : "Todo Created"
    })

})
app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find();
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.put("/completed" , async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs",
        })
        return ;
    }
    await todo.update({
        _id: req.body.id
    },{
        completed : true
    })
    res.json({
        msg : "Todo marked as completed"
    })

})

app.listen(port, () =>{
    console.log(`app listening on port ${port} ` )
})
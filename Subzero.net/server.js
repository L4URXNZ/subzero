import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // voor frontend requests vanaf andere poort

// connectie met MySQL
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // jouw DB wachtwoord
    database: "subzero"
});

// TEST ROUTE
app.get("/", (req,res) => res.send("Server running"));

// SIGN UP
app.post("/api/signup", async (req,res)=>{
    const { username, email, password } = req.body;
    try{
        const hash = await bcrypt.hash(password, 10);
        await db.execute(
            "INSERT INTO users (username,email,password_hash) VALUES (?,?,?)",
            [username,email,hash]
        );
        res.json({success:true});
    }catch(err){
        res.json({success:false, message: err.code || "DB Error"});
    }
});

// SIGN IN
app.post("/api/signin", async (req,res)=>{
    const { email, password } = req.body;
    try{
        const [rows] = await db.execute("SELECT * FROM users WHERE email=?",[email]);
        if(rows.length === 0) return res.json({success:false, message:"Email not found"});
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match) return res.json({success:false, message:"Wrong password"});
        res.json({success:true});
    }catch(err){
        res.json({success:false, message: err.code || "DB Error"});
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

import express from 'express';
import con from '../utlis/db.js';
import jwt from "jsonwebtoken";
import bodyParser from 'body-parser';
import cors from 'cors';



const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email=? AND password=?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token',token);
            return res.json({ loginStatus:true });
       
        }else{
            return res.json({ loginStatus: false, Error: "wrong email or pasword" });
        
        }
    });
});
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.post('/add_employee', (req, res) => {
    // Check if the form data is correctly parsed
    console.log('Received data:', req.body);
  
    const sql = 'INSERT INTO employee (name, email, password, address, salary, category_id) VALUES (?, ?, ?, ?, ?, ?)';
  
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.address,
      req.body.salary,
      req.body.category_id
    ];
  
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error during insertion:', err);
        return res.json({ Status: false, Error: 'Query Error' });
      }
      console.log('Insertion successful');
      return res.json({ Status: true });
    });
  });
  
router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

export { router as adminRouter };

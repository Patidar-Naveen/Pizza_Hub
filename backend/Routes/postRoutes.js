import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
const jwtSecret = 'kuzuri';
import user from '../db/CategoryScehma.js'
import menuSchema from '../db/menuScehma.js'
import orderSchema from '../db/orderSchema.js'
const router = express.Router();
const db = "mongodb://localhost:27017/pizza"
import nodemailer from 'nodemailer'
// const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "naveenpatidar3330@gmail.com",
        pass: ""
    }
})

const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MondoDB connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
connectDB();

router.post('/addUser', (req, res) => {

    let insert = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        address: req.body.address,
    })
    console.log(insert, "line 15")

    insert.save((e) => {
        console.log(e)
        if (e) {
            res.send("Already added")
        }
        else {
            res.send("category added")
        }
    })
})
router.get("/getpost", (req, res) => {
    menuSchema.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})
router.get("/fetchdata", (req, res) => {
    user.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})
router.get("/allorders", (req, res) => {
    orderSchema.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})
router.post('/placeorder', (req, res) => {

    let insert2 = new orderSchema({
        details: req.body.details,
        price: req.body.price,
        status: req.body.status,

    })
    console.log(insert2, "line 15")

    insert2.save((e) => {
        console.log(e)
        if (e) {
            res.send("Already added")
        }
        else {
            transporter.sendMail({
                from: 'naveenpatidar3331@gmail.com',
                to: req.body.details,
                subject: "order Confirmation",
                text: "your order is placed"
            }, (error, res) => {
                if (error) { console.log(error) } else { console.log("mail sent", res) }
            });
        }
    })
})
router.post("/validate", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    user.findOne({ email: email, password: password }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "Email or password is not correct" })
        }
        else {
            let payload = {
                uid: email
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }
    })
})

export default router
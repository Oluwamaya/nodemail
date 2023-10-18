const express = require("express")
const app = express()
const port = 5003
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.post("/",(req, res) => {
    const { email, name, songRequest, rate } = req.body;

    const template = `
    <h3>Hello mayatracks,</h3>
    Add this to your song tracks ${songRequest}
    Rate: ${rate}
    userEmail: ${email}
    `
    // Send Mail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "adeyemiawosemo@gmail.com",
            pass: "whtq rebw sprv biop"
        }
    });

    const mailOptions = {
        from: email,
        to: "adeyemiawosemo@gmail.com",
        subject: `${name} sent you an opinion`,
        html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error)
            res.status(401).json({ status: 401, error })
        } else {
            console.log("hehehe");
            res.status(201).json({ status: 201, info })
        }
    })

    })
app.listen(port, () => {
    console.log("started at ", port)
})
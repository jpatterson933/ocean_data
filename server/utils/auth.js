const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secret = "mysecretssshhhhhhhsecretsecret";
const emailSecret = "supersupersecretstuffhere9"
const expiration = "2h";

const transporter = nodemailer.createTransport({
    service: "Zoho",
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.ZOHO_USERNAME,
        pass: process.env.ZOHO_PASSWORD
    }
})

module.exports = {
    AuthenticationError: new GraphQLError("Could not authenticate user.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }
        if (token) {

            try {
                const { data } = jwt.verify(token, secret, { maxAge: expiration });
                req.user = data;
            } catch {
                console.log("Invalid token");
            }
        }

        return req;
    },
    signToken: function ({ email, _id }) {
        const payload = { email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    verifyUser: async function ({ email, _id }) {
        const emailToken = jwt.sign(
            {
                user: _id,
            },
            emailSecret,
            {
                expiresIn: "1d",
            }
        )

        console.log(emailToken)

        const url = `http://localhost:3000/confirmation/${emailToken}`

        await transporter.sendMail({
            from: process.env.ZOHO_USERNAME,
            to: email,
            subject: "Please Verify Email For Ocean Data",
            html: `Please click this link to confirm your email for Ocean Data <a href=${url}>${url}</a>`
        })
    },
    getUserFromEmailToken: function (token) {
        try {
            const {user: userId} = jwt.verify(token, emailSecret);
            console.log(userId, "userId")
            return userId;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
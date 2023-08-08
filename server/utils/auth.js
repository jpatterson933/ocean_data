const { User } = require("../models");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const rn = require("random-number");
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

        let gen = rn.generator({
            min: 1000000,
            max: 9999999,
            integer: true
        })

        const digits = gen();

        await User.findByIdAndUpdate(_id, { verificationNumber: digits });

        await transporter.sendMail({
            from: process.env.ZOHO_USERNAME,
            to: email,
            subject: "Please Verify Email For Ocean Data",
            html: `Please enter these digits ${digits} to verify your email.`
        })
    },
    getUserFromEmailToken: function (token) {
        try {
            const { data: { _id: userId } } = jwt.verify(token, secret, { maxAge: expiration });
            // console.log(userId, "userId")
            return userId;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
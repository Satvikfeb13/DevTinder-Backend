const express = require("express");
const User = require("../models/user.js")
const { userauth } = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionrequest.js");
const connectionrequest = require("../models/connectionrequest.js");
const requestrouter = express.Router();
requestrouter.post("/request/send/:status/:toUserId", userauth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedstatus = ['ignored', 'interested'];
        // checking status
        if (!allowedstatus.includes(status)) {
            return res
                .status(400)
                .json({
                    message: "Invalid status type" + status
                })
        }
        // check the user is already exist or not
        const existingconnectionrequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId, fromUserId },
            ],
        })
        if (existingconnectionrequest) {
            return res
                .status(400)
                .send({
                    message: "Connection Request Already Exist"
                })
        }
        // console.log(toUserId);
        const Userexist = await User.findById(toUserId);
        if (!Userexist) {
                return res
                .status(400)
                .send({
                    message:"User Not found"
                })

        }
        const Connectionrequest = new ConnectionRequest({
            fromUserId, toUserId, status
        });
        const data = await Connectionrequest.save();
        res.json({
            message: "Connection Request Send Successfully",
            data
        })
    } catch (error) {
        res.status(400).send("Err: " + error.message);
    }
})
module.exports = requestrouter;
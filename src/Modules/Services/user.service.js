import { Users } from './../../DB/Models/user.model.js';
import { fail_res } from './../../Utils/fail.res.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
export const signup = async (data) => {
    try {
        const newUser = await Users.insertOne(data)
        if (!newUser) {
            fail_res({ msg: "Email already exists", statuscode: 500 })
        }
    }
    catch (error) {
        console.log(error)
        fail_res({ msg: error.message, statuscode: StatusCodes.NOT_ACCEPTABLE })
    }
}

export const login = async (data) => {
    const user = await Users.findOne(data)
    if (!user) {
        fail_res({ msg: "Invalid email or password" })
    }
}

export const update_id = async (id, data) => {
    const userID=new mongoose.Types.ObjectId(id)
    const result = await Users.findById(userID)

    if (result != null) {
        const { matchedCount } = await Users.updateOne({_id:userID},data)
        if (matchedCount == 0) {
            fail_res({ msg: "Email already exists" })
        }
    }
    else {
        fail_res({ msg: "User not found", statuscode: 500 })
    }
}

export const delete_user = async (id) => {
    const userID=new mongoose.Types.ObjectId(id)
    const { deletedCount } = await Users.deleteOne(userID)
    if (deletedCount == 0) {
        fail_res({ msg: "User not found" })
    }
}

export const get_id = async (id) => {
    const userID=new mongoose.Types.ObjectId(id)
    const user = await Users.findById(userID)
    console.log(user)
    return user
}
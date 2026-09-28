import { Router } from "express"
import * as user_services from "../Services/user.service.js"
import { success_res } from "../../Utils/success.res.js"
import {StatusCodes} from "http-status-codes"
import { fail_res } from './../../Utils/fail.res.js';
export const router=Router()

export const routes={
    base:"/users",
    login:"/login",
    update_id:"/:id",
    delete:"/:id",
    get_id:"/:id",
    signup:"/signup"
}

router.post(routes.signup,async(req,res)=>{
    await user_services.signup(req.body)

     return success_res({res,msg:"User added sucessfully",statuscode:StatusCodes.CREATED})

})

router.post(routes.login,async(req,res)=>{
    await user_services.login(req.body)
    return success_res({res,msg:"Logged successfully"})
})

router.patch(routes.update_id,async(req,res)=>{
    const userID=req.params.id
    await user_services.update_id(userID,req.body)
    return success_res({res,msg:"User updated"})
})

router.delete(routes.delete,async(req,res)=>{
    const userID=req.params.id
    await user_services.delete_user(userID)
    return success_res({res,statuscode:StatusCodes.ACCEPTED,msg:"User deleted"})
})

router.get(routes.get_id,async(req,res)=>{
    const userID=req.params.id
    const user=await user_services.get_id(userID)
    return success_res({res,statuscode:StatusCodes.ACCEPTED,data:{user}})
})
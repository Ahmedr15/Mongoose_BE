export const success_res=({res,statuscode=201,msg="Done",data={}})=>{
    return res.status(statuscode).json({
            msg,
            data
        })
}
import { RequestHandler } from "express";
import httpStatus from "http-status";
import { jobService } from "./job.service";

const createJob:RequestHandler=async(req,res,next)=>{
    try {
        const result=await jobService.createJob(req.body)
        res.status(httpStatus.OK).json({
            success:true,
            data:result
        })
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({
            success:false,
            data:error
        })
    }
}

export const jobController={
    createJob
}
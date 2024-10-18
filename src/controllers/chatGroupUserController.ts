import { Request, Response } from "express";
import prisma from "../config/db.config";

interface GroupUserType{
    name:string;
    group_id: string;
}
export const userIndex = async(req:Request, res:Response) => {
    try {
        const {group_id} = req.query;
        console.log("qur",req.query)
        const users = await prisma.groupUsers.findMany({
            where:{
                group_id :group_id as string
            }
        })
         res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: users
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const userStore = async(req:Request, res:Response) => {
    try {
        const body:GroupUserType = req.body;

        const user = await prisma.groupUsers.create({
            data:body
        })
         res.status(200).json({
            success: true,
            message: "Data stored successfully",
            data:user
        })
    } catch (error) {
        console.log(error)
         res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
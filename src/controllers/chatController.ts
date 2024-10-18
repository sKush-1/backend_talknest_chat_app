import { Request, Response } from "express";
import prisma from "../config/db.config";

export const chatIndex = async (req:Request,res:Response) => {
    try {
        const {groupId} = req.query;
    const chats = await prisma.chats.findMany({
        where:{
            group_id: groupId as string
        }
    });

    res.status(200).json({
        success: true,
        data: chats
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: []
        })
    }
}
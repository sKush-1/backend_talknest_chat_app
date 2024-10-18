import prisma from "../config/db.config";
import { Request, Response } from "express";

export const store = async (req: Request, res: Response) => {
  try {
    const {title,passcode} = req.body;

    await prisma.chatGroup.create({
        data: {
            title,
            passcode,
            user_id:req.user.id ,
        },
        
    })
     res.status(201).json({
        success: true,
        message: "Chat group created sucessfully"
    })

  } catch (error) {
    console.log(error)
     res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const index = async (req: Request, res: Response) => {
  try {
   const groups =  await prisma.chatGroup.findMany({
      where:{
        user_id: req?.user.id 
      },
      orderBy: {
        created_at: "desc"
      }
    })
     res.status(201).json({
        success: true,
        message: "Chat groups fetched sucessfully",
        groups
    })

  } catch (error) {
    console.log("indx",error)
     res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
   const {id} = req.params;
   const group =  await prisma.chatGroup.findUnique({
      where:{
        id
      },
     
    })
     res.status(201).json({
        success: true,
        message: "Chat group fetched sucessfully",
        data: group
    })

  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
   const {id} = req.params;
   const {title,passcode} = req.body;
   const group =  await prisma.chatGroup.update({
    data: {
      title,
      passcode
    },
    where:{
      id
    }

   })
     res.status(201).json({
        success: true,
        message: "Chat group updated sucessfully",
        group
    })

  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
   const {id} = req.params;
   const groups =  await prisma.chatGroup.delete({
      where:{
        id
      },
     
    })
     res.status(201).json({
        success: true,
        message: "Chat group deleted sucessfully",
    })

  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

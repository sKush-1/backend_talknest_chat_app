import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}


export const login = async (req: any, res: Response) => {
  try {
    const body = req.body;

    let findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!findUser) {
      findUser = await prisma.user.create({
        data: body,
      });
    }

    const JWTPayload = {
      name: body.name,
      email: body.email,
      id: findUser.id,
    };

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: "365d",
    });


     res.status(200).json({
      message: "Logged in successfully!",
      user: {
        ...findUser,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "false"
    })
  }
}
   
import prisma from '../../db'
import {comparePasswords, createJWT, hashPassword} from "../auth";

export const createNewUser = async (req, res) => {
    console.log(req.body)
    const user = await prisma.user.create({
      data: {
          // @ts-ignore
          username: req.body.username,
          // @ts-ignore
          password: await hashPassword(req.body.password),
      }
    });

    const token = createJWT(user);
    res.json({token});


}

export const signIn = async(req, res) => {
    console.log(req.body)
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const validPassword = await comparePasswords(req.body.password, user.password);

    if(!validPassword) {
        return res.status(401).json({message: 'Invalid Password'});
    }

    const token = createJWT(user);
    res.json({token});
}
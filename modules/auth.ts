import jwt from 'jsonwebtoken';

export const createJWT  = (user: {id: string, email: string} ) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_TOKEN || ''
    );

}

export const protect    = (req: any, res: any, next: any) => {
    const bearerToken = req.headers.authorization;

    if(!bearerToken || !bearerToken.startsWith('Bearer ')) {
        res.status(401).json({  message: 'Unauthorized' });

    }



}
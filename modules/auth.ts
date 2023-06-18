import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export const createJWT  = (user ) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET || ''
    );

}

export const protect    = (req: any, res: any, next: any) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken || !bearerToken.startsWith('Bearer')) {
        console.log(bearerToken.startsWith('Bearer'), bearerToken)

        res.status(401).json({  message: 'Unauthorized' });

    }

    const [, token] = bearerToken.split(' ');

    if (!token) {
        res.status(401).json({  message: 'Not Valid token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({  message: 'Not Valid token' });
    }



}

export const comparePasswords = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}
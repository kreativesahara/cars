import { users } from '../db/schema/user';
import db from '../db/dbConfig'
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

export const handleLogin = async (req:any, res:any) => {
    //const { user, pwd } = req.body;
   // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    //const foundUser = await User.findOne({ username: user }).exec();
    const foundUser: any = await db.select({firstname: users.firstname }).from(users).execute()
    res.send(foundUser)
    //if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    //const match = await bcrypt.compare(pwd, foundUser.password);
    //if (match) {
       //const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        //TODO: change access token expire 
        // const accessToken = jwt.sign(
        //     {
        //         "UserInfo": {
        //             "username": foundUser.username,
        //             "roles": roles
        //         }
        //     },
        //     process.env.ACCESS_TOKEN_SECRET,
        //     { expiresIn: '10s' },

        // );


        // const refreshToken = jwt.sign(
        //     { "username": foundUser.username },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: '1h' }
        // );
        // Saving refreshToken with current user
        //foundUser.refreshToken = refreshToken;
        //const result = await foundUser.save();
        // console.log(result);
        // console.log(roles);

        // Creates Secure Cookie with refresh token
        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        //secure:true,
        // Send authorization roles and access token to user
        //res.json({ roles, accessToken });

    //} else {
        //res.sendStatus(401);
    //}
}


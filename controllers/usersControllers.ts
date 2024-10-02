import {users} from '../db/schema/user';
import db from '../db/dbConfig'

// const getAllUsers = async (req: any, res:any) => {
//     // logic to fetch all users from your database
//     //console.log(users)

//     console.log('hello from users controller');
//     const result: any = await db.select().from(users)

//     res.send(result)
// }
// const createUser = async (req: any, res: any) => {
//     // logic to create a new user in your database
//     console.log('please add the logic to create user')
// }
// export { getAllUsers, createUser };

const getAllUsers:(req:any, res:any)=>Promise<any> = async ( req: any, res: any): Promise<any> =>{
    console.log('hello from users controller');
    const result:any = await db.select().from(users)
    if (!result) return res.status(204).json({ 'message': 'No users found.' });
    res.json(result);
}

// const createUser: (req: any, res: any) => Promise<any> = async (req:any, res: any): Promise<any> => {
//     const {
//         name,
//         brand,
//         slug,
//         description,
//         price,
//         category,
//         quantity,
//         year,
//         photo,
//         location
//     } = req.body.values;
//     if (
//         !name || !brand || !description || !price || !category || !quantity || !year || !location
//     ) {    
//          return res.status(400).json({ 'message': 'some inputs are required' });    
//     }

//     try {
//         const result:any = await user.create({
//             name: name,
//             brand: brand,
//             description: description,
//             price: price,
//             category: category,
//             quantity: quantity,
//             year: year,
//             location: location
//             // photo: photo,
           
//         });
//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

// const updateUser = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//    // const user:any = await user.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
//     }
//     if (req.body?.name) user.name = req.body.name;
//     if (req.body?.brand) user.brand = req.body.brand;
//     if (req.body?.slug) user.slug = req.body.slug;
//     if (req.body?.description) user.description = req.body.description;
//     if (req.body?.price) user.price = req.body.price;
//     if (req.body?.category) user.category = req.body.category;
//     if (req.body?.quantity) user.quantity = req.body.quantity;
//     if (req.body?.manufactured) user.manufactured = req.body.manufactured;
//     if (req.body?.shipping) user.shipping = req.body.shipping;
//     const result = await user.save();
//     res.json(result);
// }

// const deleteUser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'user ID required.' });

//    // const user:any = await user.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
//     }
//     const result = await user.deleteOne(); //{ _id: req.body.id }
//     res.json(result);
// }

// const getuser = async (req, res) => {
//     if (!req?.params?.id) return res.status(400).json({ 'message': 'user ID required.' });

//     //const user = await user.findOne({ _id: req.params.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
//     }
//     res.json(user);
// }

export  {
    getAllUsers
    // createUser,
    // updateUser,
    // deleteUser,
    // getUser
}

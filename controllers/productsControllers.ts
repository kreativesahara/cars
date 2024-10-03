import { cars } from '../db/schema/product';
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

const getAllProducts: (req: any, res: any) => Promise<any> = async (req: any, res: any): Promise<any> => {
    console.log('hello from products controller');
    const result: any = await db.select().from(cars)
    if (!result) return res.status(204).json({ 'message': 'No product found.' });
    res.json(result);
}

const createProduct: (req: any, res: any) => Promise<any> = async (req:any, res: any): Promise<any> => {
    const {
        make,
        model,
        year,
        engine_capacity,
        fuel_type,
        transmission,
        driveSystem,
        mileage,
        features,
        condition,
        location,
        price,
        seller_id=1
    } = req.body;
    if (
        !make || !features || !seller_id || !mileage || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !price || !condition || !location 
    ) {    
         return res.status(400).json({ 'message': 'some inputs are required' });    
    }

    try {
        const result = await db.insert(cars).values({
            make,
            model,
            year,
            engine_capacity,
            fuel_type,
            transmission,
            driveSystem,
            mileage,
            features,
            condition,
            location,
            price,
            seller_id,
            // photo: photo,

        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

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

export {
    getAllProducts,
    createProduct,
    // updateUser,
    // deleteUser,
    // getUser
}

module.exports ={ 
    getAllBills: function (req: any, res: any) {
        // logic to fetch all users from your database
        console.log('this is a GET request')
            res.send('hello from bills controller');  
    },
    getBill: function (req: any, res: any) {
        // logic to fetch all users from your database
        console.log('this is a GET request')
            res.send('this is your bill');  
    }
}
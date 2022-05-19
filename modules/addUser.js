module.exports = async function (firstname, lastname, email, password, client){
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = await client.db(process.env.db_name);
        const col = await db.collection("Users");
        let personDocument = {
            "firstName": firstname, 
            "lastName": lastname,
            "Email": email,
            "Password": password

        }
        const p = await col.insertOne(personDocument);
        console.log(`Add user ${firstname} ${lastname} successfully`); 

    }catch (err) {
        console.log(err.stack);
    }finally{
        await client.close();
    }
}
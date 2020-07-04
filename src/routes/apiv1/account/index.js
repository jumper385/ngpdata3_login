import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltcount = 10;

mongoose.connect('mongodb+srv://nova:st18chenh@cluster0-ztrfz.azure.mongodb.net/ngpdata3_dev?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true})
	.then( () => console.log('db conenction established'));

const AccountSchema = mongoose.Schema({
	username:{type:String, required:true},
	password:{type:String, required:true},
	name:{type:String, required:true}
});

const Account = mongoose.model('user',AccountSchema);

export const get = (req,res) => {
	res.status(200).json('yeet');
};

export const post = async (req,res) => {
	let {username, name, password} = req.body;


	// check if username exists
	let accountquery = await Account.find({username:username});
	let accountExists = !!accountquery[0];

	if (accountExists) {
		res.status(403).json({message:'user already exists'});
	}

	else {
		// hash password
		let pwdhash = await bcrypt.hash(password, saltcount);

		try {
		// upload to database
			let newaccount = await Account.create({
				username: username,
				password: pwdhash, 
				name: name
			});
			//return the data
			res.status(200).json(newaccount);

		} catch (err) {
			res.status(500).json({message:'internal server error', stack:err.message});
		}
	}

};
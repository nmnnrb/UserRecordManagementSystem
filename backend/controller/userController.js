import userModel from '../model/userModel.js'

const getAllUsers = async (req, res) => {
 const users = await userModel.find()
 res.json({sucess: true, users: users})
}



const createUser = async (req,res) => {
    console.log('File:', req.file);
    console.log('Body:', req.body);
    const { f_Name, f_Email, f_Destination,  f_Gender, f_Mobile, f_Course} = req.body;
    const f_Image = req.file ? req.file.filename : 'placeholder.png'  ;

    const newUser = await new userModel({ f_Name, f_Email, f_Mobile, f_Destination, f_Gender, f_Image, f_Course});


    await newUser.save();
    res.json({sucess: true, user: newUser})
}



const updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  
    // Update the user with req.body
    const getUser = await userModel.findById(id);
    if (!getUser) {
      return res.status(404).send('The user with the given ID was not found.');
    }
  
    const { f_Name, f_Email, f_Destination, f_Gender, f_Mobile, f_Course } = req.body;
    let f_Image = getUser.f_Image;  // Default to the existing image
  
    // Check if a new image is uploaded
    if (req.file) {
      f_Image = req.file.filename; // Update the image if a new file is uploaded
    }
  
    // Update user fields
    getUser.f_Name = f_Name || getUser.f_Name;
    getUser.f_Email = f_Email || getUser.f_Email;
    getUser.f_Destination = f_Destination || getUser.f_Destination;
    getUser.f_Gender = f_Gender || getUser.f_Gender;
    getUser.f_Mobile = f_Mobile || getUser.f_Mobile;
    getUser.f_Course = f_Course || getUser.f_Course;
    getUser.f_Image = f_Image; // Update the image if new one is provided
  
    try {
      await getUser.save();  // Save the updated user
      res.json({ success: true, user: getUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user.');
    }
  };
  


const deleteUser = async (req,res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).send('The user with given ID was not found.');
    }
    try {
        await userModel.findByIdAndDelete(id);
        res.status(200).send({sucess: true, message: "User deleted"})
    } catch (error) {
        return res.status(404).send('The user with given ID was not found.');
    }

}


const getSingleUsers = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).send('The user with given ID was not found.');
    }
    console.log(user);
    res.status(200).send(user);
}


export { getAllUsers, createUser, updateUser, deleteUser, getSingleUsers };

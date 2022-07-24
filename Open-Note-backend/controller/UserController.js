import UserModel from '../models/UserModel.js';
import UserValidaton from '../validation/UserValidation.js'
import UserEncryption from '../cryptography/UserEncryption.js';
import UserAuthentication from '../authentication/UserAuthentication.js';

class UserServices {

  signupUser = async (req, res) => {
    //validation
    const { error, value } = UserValidaton.signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: 'joi-signup-failed', response: error.details });
    } else {
      //check email in db
      const checkEmailExist = await UserModel.findOne({ email: value.email });
      if (checkEmailExist) {
        res.status(400).json({ status: 'db-check-failed', response: 'email already exists' });
      } else {
        //encryption
        const data = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: await UserEncryption.encrypt(value.password)
        }
        //insert
        const user = new UserModel(data);
        user.save((error, user) => {
          if (error) {
            res.status(500).json({ status: 'db-insert-failed', response: error.message })
          } else {
            res.status(200).json({ status: 'db-insert-success', authToken: UserAuthentication.authToken(user.id) })
          }
        })
      }
    }
  }

  loginUser = async (req, res) => {
    //validation
    const { error, value } = UserValidaton.loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ status: 'joi-login-failed', response: error.details });
    } else {
      //check email in db
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        res.status(400).json({ status: 'db-login-failed', response: 'Please enter proper credentials' });
      } else {
        //check password
        const passwordCompare = await UserEncryption.decrypt(value.password, user.password);
        if (!passwordCompare) {
          res.status(400).json({ status: 'db-login-failed', response: 'Please enter proper credentials' });
        } else {
          //send token if authenticated
          res.status(200).json({ status: 'db-check-success', authToken: UserAuthentication.authToken(user.id) });
        }
      }
    }
  }

  profile = async (req, res) => {
    const user = await UserModel.findById({ _id: '62dd748a34f895c2e11a8b6e' }).select('-password');
    res.status(200).json({
      status: 'db-success',
      response: user
    })
  }
}



export default UserServices;
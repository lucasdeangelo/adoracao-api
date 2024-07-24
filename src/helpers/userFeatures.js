import jwt from 'jsonwebtoken';

function generateToken(id_login, email_user){
  const secret = '1501222724' 
  return jwt.sign({infoUser: {id_login, email_user}}, secret, {expiresIn: 60 * 60});
}

export {generateToken};
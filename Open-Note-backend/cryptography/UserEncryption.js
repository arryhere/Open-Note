import bcrypt from 'bcryptjs';

const salt = await bcrypt.genSalt(10);

async function encrypt(password) {
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function decrypt(enteredPassword, userPassword)  {
    const compare = await bcrypt.compare(enteredPassword, userPassword);
    return compare;
}

export default { encrypt, decrypt };
const bcrypt = require('bcryptjs')
const saultRounds = 12

const hashPass = value =>
{
  return bcrypt.hashSync(value, saultRounds)
}
const comparePass = async (originVal, hashedVal) =>
{
  return await bcrypt.compare(originVal, hashedVal)
}

module.exports = {
  hashPass,
  comparePass
}
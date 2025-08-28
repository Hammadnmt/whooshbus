export default async function validPassword() {
  const isPasswordValid = await bcrypt.compare(password, user.password);
}

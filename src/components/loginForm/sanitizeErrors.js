export default error => {
  switch (error) {
    case "invalid_username":
      return "Invalid username or password."

    case "incorrect_password":
      return "Invalid username or password."

    default:
      return error
  }
}

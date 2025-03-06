import LogIn from "../components/login.js";
import Layout from "../layouts/default.js";

export default function SignIn(){
    const { main } = Layout(this.root)

    LogIn(main)
}
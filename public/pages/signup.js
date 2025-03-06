import CreateAccount from "../components/signUp.js";
import Layout from "../layouts/default.js";

export default function SignUp(){
    const { main } = Layout(this.root)

    CreateAccount(main)
}
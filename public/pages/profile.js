import ProfileComponent from "../components/profile.js";
import Layout from "../layouts/default.js";

export default function ProfilePage() {
    const { main } = Layout(this.root) // Ensure root is correctly passed
    ProfileComponent(main);
}

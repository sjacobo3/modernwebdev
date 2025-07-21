import AuthModule from "../Auth/Auth";
import Parse from "parse";
import { authenticateUser } from "../../Services/AuthService";

function Home() {
    // get current user
    const currentUser = Parse.User.current();
    // if user is logged in, get full name
    const userFullName = currentUser ? 
        currentUser.get("firstName") + " " + currentUser.get("lastName") : 
        "";
    
    return (
        <div class="container">
            <h1>Pick My Professor?</h1>
            <h2>Help fellow students choose their courses wisely!</h2> 
            {authenticateUser() ? (
                <div>
                    <p>Welcome back, {userFullName}!</p>
                </div>
            ) : (
                <AuthModule />
            )}
            <br/>
            <div className="dome"></div>
        </div>
    );
};

export default Home;
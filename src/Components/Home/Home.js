import './Home.css'
import AuthModule from "../Auth/Auth";

function Home() {
    return (
        <div class="container">
            <h1 
            style = {{
                fontSize: "50px", 
                fontWeight: 600, 
                marginBottom: "20px"}}>
                Pick My Professor?</h1>
            <p style={{ 
                fontSize: "25px", 
                marginBottom: "20px" }}>
        Help fellow students choose their courses wisely!
      </p> 
      <br/>
            <div className="dome"></div>
            <AuthModule/> {/*show login/register buttons*/}
        </div>
    );
};
export default Home;
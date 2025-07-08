import AuthModule from "../Auth/Auth";

function Home() {
    return (
        <div class="container">
            <h1>Pick My Professor?</h1>
            <p>Help fellow students choose their courses wisely!</p> 
            <AuthModule />
            <br/>
            <div className="dome"></div>
        </div>
    );
};

export default Home;
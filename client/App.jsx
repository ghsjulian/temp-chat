import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
// Import App Layouts Here..
// Import Components
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// Import Authentication Here...
import useAuth from "./store/useAuth";
import useApp from "./store/useApp";
// Import Laayouts
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import ChatBox from "./pages/ChatBox";

const App = () => {
    const { user } = useAuth();
    const { activeHeader } = useApp();
    const isLoggedIn = () => {
        if ((!user && !user?._id) || user === null) return false;
        return true;
    };
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        isLoggedIn() ? <Layouts /> : <Navigate to="/login" />
                    }
                >
                <Route index path="/" element={<Home/>}/>
                    <Route path="/chat/:name/:id" element={<ChatBox />} />
                </Route>
                <Route
                    path="/signup"
                    element={isLoggedIn() ? <Navigate to="/" /> : <Signup />}
                />
                <Route
                    path="/login"
                    element={isLoggedIn() ? <Navigate to="/" /> : <Login />}
                />
            </Routes>
        </Router>
    );
};

export default App;

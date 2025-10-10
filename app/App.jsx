import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Layouts from "./layouts/Layouts";
import Welcome from "./components/Welcome"
import Chatbox from "./pages/Chatbox"


const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Layouts/>}
                >
                <Route
                    index
                    path="/"
                    element={<Welcome/>}
               />
               <Route
                    
                    path="/chats/:name/:id"
                    element={<Chatbox/>}
               />
            </Route>
            </Routes>
        </Router>
    );
};

export default App;

import { BrowserRouter, Route ,Routes} from "react-router-dom"
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import Adddish from "./components/Adddish";
function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/adddish" element={<Adddish/>}/>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

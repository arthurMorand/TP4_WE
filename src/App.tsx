import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import BeerList from "./BeerList";
import BeerDetails from "./BeerDetails";
import About from "./About";
import Footer from "./Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<BeerList/>}/>
                    <Route path="/beer/:id" element={<BeerDetails/>}/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

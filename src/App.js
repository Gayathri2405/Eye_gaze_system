// Copyright 2023 MediaPipe & Malgorzata Pick
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WebcamImg from "./components/webcamImg/WebcamImg";
import CommunicationPage from "./components/icons/communication"; // 
import BrowserPage from "./components/icons/browser"; // 
import GamingPage from "./components/icons/gaming"; //
import Key2 from "./components/icons/key2.js"; // 
import Key3 from "./components/keyboard/key3"; // 
import Key4 from "./components/keyboard/key4"; // 
import Key5 from "./components/keyboard/key5"; // 
import Key6 from "./components/keyboard/key6"; // 
import Key7 from "./components/keyboard/key7"; // 
import Key8 from "./components/keyboard/key8"; // 
import Key9 from "./components/keyboard/key9"; // 
import Key10 from "./components/keyboard/key10"; // 
import Key11 from "./components/keyboard/key11"; // 
import Key12 from "./components/keyboard/key12"; // 
import Key13 from "./components/keyboard/key13"; // 
import Key14 from "./components/keyboard/key14"; // 
import Key15 from "./components/keyboard/key15"; // 
import Key16 from "./components/keyboard/key16"; // 
import Key17 from "./components/keyboard/key17"; // 
import Key18 from "./components/keyboard/key18"; // 
import Key19 from "./components/keyboard/key19"; // 
import Key20 from "./components/keyboard/key20"; // 
import Key21 from "./components/keyboard/key21"; // 
import Key22 from "./components/keyboard/key22"; // 
import Key23 from "./components/keyboard/key23"; // 
import Key24 from "./components/keyboard/key24"; // 
import Key25 from "./components/keyboard/key25"; // 
import Key26 from "./components/keyboard/key26"; // 
import Key27 from "./components/keyboard/key27"; // 

import Rock from "./components/icons/rock"; // 
import Paper from "./components/icons/paper"; // 
import Scissors from "./components/icons/scissors"; // 

const App = () => {
  return (
    <Fragment>
      <div className="main" >
    <Router basename="/React-PD-Meter-App">
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<WebcamImg />} />
        <Route path="/communication" element={<CommunicationPage />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/browser" element={<BrowserPage />} />
        <Route path="/key2.js" element={<Key2 />} />
        <Route path="/key3" element={<Key3 />} />
        <Route path="/key4" element={<Key4 />} />
        <Route path="/key5" element={<Key5 />} />
        <Route path="/key6" element={<Key6 />} />
        <Route path="/key7" element={<Key7 />} />
        <Route path="/key8" element={<Key8 />} />
        <Route path="/key9" element={<Key9 />} />
        <Route path="/key10" element={<Key10 />} />
        <Route path="/key11" element={<Key11 />} />
        <Route path="/key12" element={<Key12 />} />
        <Route path="/key13" element={<Key13 />} />
        <Route path="/key14" element={<Key14 />} />
        <Route path="/key15" element={<Key15 />} />
        <Route path="/key16" element={<Key16 />} />
        <Route path="/key17" element={<Key17 />} />
        <Route path="/key18" element={<Key18 />} />
        <Route path="/key19" element={<Key19 />} />
        <Route path="/key20" element={<Key20 />} />
        <Route path="/key21" element={<Key21 />} />
        <Route path="/key22"element={<Key22 />} />
        <Route path="/key23" element={<Key23 />} />
        <Route path="/key24" element={<Key24 />} />
        <Route path="/key25" element={<Key25 />} />
        <Route path="/key26" element={<Key26 />} />
        <Route path="/key27" element={<Key27 />} />
        
        <Route path="/rock" element={<Rock />} />
        <Route path="/paper" element={<Paper />} />
        <Route path="/scissors" element={<Scissors />} />
        {/* Add more routes as needed */}
      </Routes>
    
    </Router>
    </div>
    </Fragment>
  );
};


export default App;
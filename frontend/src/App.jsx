import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Verify from "./pages/verify";
import Issue from "./pages/issue";

// const Home = () => {
//   return (
//     <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-5xl font-bold text-gray-800 mb-8">TrustChain</h1>
//       <p className="text-lg text-gray-600 mb-12 text-center max-w-md">
//         Issue Documents with Confidence, Verify them with Ease
//       </p>
//       <div className="flex space-x-4">
//         <Link to="/verify">
//           <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
//             Verify
//           </button>
//         </Link>
//         <Link to="/issue">
//           <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
//             Issue
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-start justify-center p-8 max-w-md text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">TrustChain</h1>
        <p className="text-lg text-gray-600 mb-12">
          Issue Documents with Confidence, Verify them with Ease
        </p>
        <div className="flex space-x-4 mb-8">
          <Link to="/verify">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Verify
            </button>
          </Link>
          <Link to="/issue">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              Issue
            </button>
          </Link>
        </div>
        <div className="hidden md:block">
          <img
            src="./assets/lock.jpg" // Ensure this path is correct
            alt="TrustChain"
            className="w-full h-auto" // Make image full width
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/issue" element={<Issue />} />
      </Routes>
    </Router>
  );
};

export default App;

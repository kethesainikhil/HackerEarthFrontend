import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import Navbar from "./components/Navbar";
import PostProperty from "./components/PostProperty";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import UpdateProperty from "./pages/UpdateProperty";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const App = () => {
//   return (
//     ReactDOM.render(
//       <React.StrictMode>
//         <Provider store={store}>
//           <Router>
//             <Navbar />
//             <Routes>
//               <Route path="/" element={<BuyerPage />}>
//                 <Route path="login" element={<LoginPage />} />
//                 <Route path="signup" element={<SignupPage />} />
//                 <Route path="buyer" element={<BuyerPage />} />
//                 <Route path="seller" element={<SellerPage />} />
//                 <Route path="postProperty" element={<PostProperty />} />
//                 <Route path="propertyDetails/:id" element={<PropertyDetailsPage />} />
//                 <Route path="editProperty/:id" element={<UpdateProperty />} />
//               </Route>
//             </Routes>
//           </Router>
//         </Provider>
//       </React.StrictMode>,
//       document.getElementById("root")
//     )
//   )
// }

// export default App
function App() {
  return (
    <BuyerPage />
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./Component/AuthProvider/AuthProvider";
import PrivateRoute from "./Component/AuthProvider/PrivateRoute";
import Login from "./Component/Login/Login";
import Dashboard from "./Component/Dashboard/Dashboard";
import ProductList from "./Component/Product/Product";
import AddProduct from "./Component/AddProduct/AddProduct";
import EditProduct from "./Component/EditProduct/EditProduct";
import SearchProduct from "./Component/SearchProduct/SearchProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ProductList" element={<ProductList />} />
              <Route path='/EditProduct/:id' element={<EditProduct />} />
              <Route path='/AddProduct' element={<AddProduct />} />
              <Route path='/SearchProduct' element={<SearchProduct />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
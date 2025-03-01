import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import PostList from "./components/PostList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostList />} />
            {/* <Route path="/posts/:postId" element={<PostDetails />}></Route> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

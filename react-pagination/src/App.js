import { useEffect, useState } from "react";
import "./App.css";
import { Pagination } from "antd";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  // 1. Get the Data from the API when the page loads
  // 2. Re fetch data when the currentPage changes
  useEffect(() => {
    getPosts();
  }, [currentPage]);

  // Fetch the Posts from the API => http://localhost:5000/api/posts/1
  const getPosts = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/posts/${currentPage}`
    );
    console.log(response.data.result.posts);
    setPosts(response.data.result.posts);
    setTotal(response.data.result.total);
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            {post.id} - {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}

      {/* Ant Design Pagination - By default onChange function of Pagination of antd has page argument which returns the which page we click */}
      <Pagination
        onChange={(page) => {
          console.log(page);
          // Change the Page No using the default Page No argument that AntD provides
          setCurrentPage(page);
          // When CurrentPage changes, useEffect will be called and it will fetch the data from the API
        }}
        defaultCurrent={1}
        // Usually total is coming from the API, set it here, so the Pagination knows how many pages to show
        // As an example if 100 posts there => it will show 10 per page for 10 pages, if 20, then for 5 pages, to calculate how much pages we need the total
        total={total}
      />
    </div>
  );
}

export default App;

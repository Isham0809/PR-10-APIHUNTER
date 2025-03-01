import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import {
  fetchPosts,
  setSearchTerm,
  setCurrentPage,
  setfilter,
  clearFilter,
} from "../features/sliceFatchPost";
import "bootstrap/dist/css/bootstrap.min.css";

function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items,
    status,
    error,
    searchTerm,
    currentPage,
    totalPosts,
    postsPerPage,
    filters,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit: postsPerPage }));
  }, [dispatch, currentPage, postsPerPage]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleUserFilter = (id) => {
    dispatch(setfilter({ id }));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  const handlePostClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className="container text-center mt-4">
        <h3 className="text-danger">Error</h3>
        <p>{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(fetchPosts({ page: 1, limit: postsPerPage }))}
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredPosts = items.filter((post) => {
    const matchesSearch = post.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = !filters.id || post.id === filters.id;
    return matchesSearch && matchesUser;
  });

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search post"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filters.id || ""}
            onChange={(e) => handleUserFilter(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Users</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                User {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          {(filters.id || searchTerm) && (
            <button className="btn btn-warning" onClick={handleClearFilter}>
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="row">
        {filteredPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card h-100" onClick={() => handlePostClick(post.id)}>
              <img src={post.image} className="card-img-top" alt={post.name} />
              <div className="card-body">
                <h5 className="card-title">{post.name}</h5>
                <p className="card-text">{post.description}</p>
                <p className="text-muted">Price: ${post.price}</p>
                <p className="text-muted">User: {post.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
}

export default PostList;

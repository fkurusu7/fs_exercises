import { RiLogoutCircleRLine } from "react-icons/ri";

function BlogHeader({ user, handleLogout }) {
  return (
    <header className="header">
      <h1>BLOG</h1>
      <h2>
        Welcome, <span className="username">{user.name.toUpperCase()}</span>
      </h2>
      <button onClick={handleLogout}>
        <RiLogoutCircleRLine />
      </button>
    </header>
  );
}

export default BlogHeader;

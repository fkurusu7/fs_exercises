function FormLogin({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) {
  return (
    <form className="form" onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div className="input-container">
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

export default FormLogin;

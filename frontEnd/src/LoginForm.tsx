interface props{
  RegiButton:()=>void
}
const LoginForm = ({ RegiButton}:props) => {
  return (
    <div
  className="d-flex justify-content-center align-items-center min-vh-100"
  style={{
    backgroundImage: `url("Try2.webp")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "1rem",
  }}
>
  <form
    className="bg-light p-5 rounded-4 shadow-lg"
    style={{
      width: "100%",
      maxWidth: "500px",
      backdropFilter: "blur(4px)",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
    }}
  >
    <h2 className="text-center text-primary fw-bold mb-4">
      Login to Schedule Tasks
    </h2>

    <div className="mb-3">
      <label
        htmlFor="UserName"
        className="form-label fw-semibold text-primary"
      >
        Username
      </label>
      <input
        type="text"
        className="form-control"
        id="UserName"
        placeholder="Enter your username"
      />
    </div>

    <div className="mb-3">
      <label
        htmlFor="password"
        className="form-label fw-semibold text-primary"
      >
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter your password"
      />
    </div>

    <button
      type="submit"
      className="btn btn-primary w-100 fw-bold"
    >
      Submit
    </button>

  <p className="text-center mt-3" style={{ fontSize: "0.95rem" }}>
  Don’t have an account?{" "}
  <button
  type="button"       
  onClick={RegiButton}
  className="btn btn-link text-primary fw-semibold p-0"
  style={{ textDecoration: "none", fontSize: "0.95rem" }}
>
  Register here
</button>

</p>
  </form>
</div>


  );
};

export default LoginForm;

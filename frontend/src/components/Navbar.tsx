import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        MovieTime<span className="logo-dot">.</span>
      </a>

      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#movies">Movies</a>
        <a href="#recommendations">Recommendations</a>
      </nav>
    </header>
  );
}

export default Navbar;
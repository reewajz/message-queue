import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>Zegal</h1>

      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

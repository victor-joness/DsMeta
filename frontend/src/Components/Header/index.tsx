import "./styles.css";
import logo from "../../assets/img/logo.svg";

function Header(){
    return(
        <header>
        <div className="dsmeta-logo-container">
            <img src={logo} alt="DSMeta" />
            <h1>DSMeta</h1>
            <p>
              Desenvolvido por
              <a href="https://github.com/victor-joness">@Victor Mesquita</a>
            </p>
        </div>
    </header>
    )
}

export default Header;
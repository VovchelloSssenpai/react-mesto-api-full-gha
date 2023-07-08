import headerLogo from '../images/logo.svg'
import {useNavigate, useLocation } from 'react-router-dom';

function Header({setProfileData, profileData}) {
    const navigate = useNavigate();

    function signOut(){
      localStorage.removeItem('token');
      navigate('/sign-in');
      setProfileData("")
    }
    const location = useLocation();

    function handleNavigation(){
      if (location.pathname === "/sign-in") {return <button className='header__button' onClick={ () => {navigate('/sign-up')}}>Регистрация</button>}
      else if(location.pathname === "/sign-up"){return <button className='header__button' onClick={() => {navigate('/sign-in')}}>Войти</button>}
      else if(location.pathname === "/"){return <button className='header__button' onClick={signOut}>Выйти</button>}
    }

    return (
    <header className="header">
    <img src={headerLogo} alt="Лого" className="header__logo"/>
    <div className='header__wrapper'>
        <p className='header__email'>{profileData}</p>
        {handleNavigation()}
    </div>
    </header>
    );
  }
  
  export default Header;
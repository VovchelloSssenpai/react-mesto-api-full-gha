import headerLogo from '../images/logo.svg'
import {useNavigate, useLocation } from 'react-router-dom';

function Header({setProfileData, profileData}) {
    const navigate = useNavigate();

    function signOut(){
      localStorage.removeItem('token');
      navigate('/signin');
      setProfileData("")
    }
    const location = useLocation();

    function handleNavigation(){
      if (location.pathname === "/signin") {return <button className='header__button' onClick={ () => {navigate('/signup')}}>Регистрация</button>}
      else if(location.pathname === "/signup"){return <button className='header__button' onClick={() => {navigate('/signin')}}>Войти</button>}
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
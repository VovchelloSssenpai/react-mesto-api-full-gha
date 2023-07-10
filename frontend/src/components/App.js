import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Login from './Login.js';
import Register from './Register.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import {api, authApi} from '../utils/Api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { CardContext } from '../contexts/CardContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {ProtectedRouteElement} from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'


function App() {

const navigate = useNavigate()

// STATES
const [currentUser, setCurrentUser] = useState({});
const [card, setCard] = useState([])
const [loggedIn, setLoggedIn] = useState(false);
const [profileData, setProfileData] = useState("")
const [authorizatioStatus, setAuthorizationStatus] = useState(false);
const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({});
const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
const [isInfoTooltipOpen, setInfoTooltip] = useState(false);
const [authorizationFormValue, setFormValue] = useState({
  password: '',
  email: ''
})
const [isLoading, setIsLoading] = useState(false);

function handleAvatarEditClick(){
  setIsEditAvatarPopupOpen(true);  
}
function handleProfileEditClick(){
  setIsEditProfilePopupOpen(true)
}
function handleCardAddClick(){
  setIsAddCardPopupOpen(true)
}
function handleCardClick(card){
  setSelectedCard(card)
  setIsImagePopupOpen(true);
}
function handleInfoTooltipPopupOpen(){
  setInfoTooltip(true);
}
function handleLogIn(){
  setLoggedIn(true)
}

const closeAllPopups = function(){
  setIsEditAvatarPopupOpen(false);  
  setIsEditProfilePopupOpen(false)
  setIsAddCardPopupOpen(false)
  setIsImagePopupOpen(false)
  setInfoTooltip(false);
}

  // GETTING PROFILE DATA
  
    useEffect(() => {
      loggedIn &&  api.getInitialProfileData(localStorage.getItem('token'))
        .then(data => {
          setCurrentUser(data);    
        })
        .catch(error => console.error(error));
    }, [loggedIn]);
  
  
  // GETTING INITIAL IMAGES DATA
  
  useEffect(()=>{
    loggedIn &&  api.getInitialImages(localStorage.getItem('token')).then(data => {
          setCard(data);
      }).catch(error => console.error(error));
  }, [loggedIn])

 


// LIKE FUNCTION

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i === currentUser._id);
  
  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch(error => console.error(error));
}

// DELETE FUNCTION
function handleCardDelete(card){
  api.deleteImage(card._id).then(
    setCard(prevState => prevState.filter((el) => el._id !== card._id)),    
    ).catch(error => console.error(error))
}

// UPDATE USER
function handleUpdateUser(userInfo){
  setIsLoading(true);
api.setUserInfo(userInfo).then((updated)=>{
  setCurrentUser(updated); closeAllPopups();
}).catch(error => console.error(error)).finally(res=>setIsLoading(false))
}

// UPDATE AVATAR
function handleUpdateAvatar(avatarLink){
  setIsLoading(true);
  api.updateAvatar(avatarLink).then((updated)=>{setCurrentUser(updated); closeAllPopups()}).catch(error => console.error(error)).finally(res => setIsLoading(false))
}

// NEW IMAGE STATE
function handleAddingNewCard(cardData){
  setIsLoading(true);
  api.addNewImage(cardData).then((updated)=>{setCard([updated, ...card]); closeAllPopups()}).finally(res =>setIsLoading(false))
}

// Registration authorization

function handleRegistration(data){
  setIsLoading(true);
 return authApi.register(data).then(data=>  {handleInfoTooltipPopupOpen(); setAuthorizationStatus(true) } )
                              .catch(error => {console.error(error); handleInfoTooltipPopupOpen(); setAuthorizationStatus(false)})
                              .finally((res)=>{setIsLoading(false)})
}
function handleAuthorization(data){
  setIsLoading(true);
  return authApi.authorize(data).then((res)=> {if (res.token){localStorage.setItem('token', res.token); setFormValue({
    password: '',
    email: ''
})} handleLogIn(); navigate("/", {replace: true});  return res}).catch(error => {handleInfoTooltipPopupOpen(); setAuthorizationStatus(false)})
.then((res)=> {setIsLoading(false)})
}

// TOKEN CHECK
const handleTokenCheck = () => {
  const token = localStorage.getItem('token');
  if (token){
    authApi.authorizationCheck(token).then((res)=>{
        setProfileData(res.email) // changed res.data.email to res.email
setLoggedIn(true);
navigate("/", {replace: true})
})}} 

useEffect(() => {
  handleTokenCheck();
  }, [])



  return (
    <div className="App">
      <div className='root'>
      <div className='page'>
      <CurrentUserContext.Provider value={currentUser} >
      <CardContext.Provider value={card}>
      <Header loginStatus={loggedIn} setLoginStatus={setLoggedIn} profileData={profileData} setProfileData={setProfileData}  />
      <Routes>
        <Route te path='/' element={ loggedIn ?  <ProtectedRouteElement loggedIn={loggedIn} element={  
        Main  
        }
        onEditAvatar={handleAvatarEditClick} 
        onEditProfile={handleProfileEditClick} 
        onAddPlace={handleCardAddClick} 
        onCardClick={handleCardClick} 
        onCardLike={handleCardLike} 
        onDeleteClick={handleCardDelete}  
        />
      :
  <Navigate to="/signin" replace />
        }>
        </Route>
        <Route path='/signup' element={<Register onRegister={handleRegistration} isLoading={isLoading} />} ></Route>
        <Route path='/signin' element={<Login onAuthorize={handleAuthorization}  
                                              setProfileData={setProfileData} 
                                              setFormValue={setFormValue} 
                                              formValue={authorizationFormValue}
                                              isLoading={isLoading}   />} >
        </Route>
      </Routes>
    { loggedIn && <Footer />}
     
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} /> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
      <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddingNewCard} isLoading={isLoading} />
      <PopupWithForm title="Вы уверены?" text="Удалить" name="delete" onClose={closeAllPopups}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} authorizationStatus={authorizatioStatus} />
      </CardContext.Provider>
      </CurrentUserContext.Provider>
      </div>
      </div>
    </div>
  );
}

export default App;

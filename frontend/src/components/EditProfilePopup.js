import  { useState, useContext, useEffect}  from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({onUpdateUser, isOpen, onClose, isLoading}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

      useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 



      
      function handleSubmit(e){
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
          });
      }

      function handleNameChange(e) {
        setName(e.target.value);
      }

      function handleDescriptionChange(e) {
        setDescription(e.target.value);
      }

    return(  
    <PopupWithForm title='Редактировать профиль' text={isLoading ? "Сохранение..." : "Сохранить"} name="edit" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
    <label className="form__label">
      <input value={name || ''} onChange={handleNameChange} type="text" className="form__input form__input_el_name" name="name" placeholder="Имя"
          required="required" minLength="2" maxLength="40" id="name-input" />
      <span className="form__input-error name-input-error"></span>
    </label>
    <label className="form__label">
      <input value={description || ''} onChange={handleDescriptionChange} type="text" className="form__input form__input_el_profession" name="profession"
          placeholder="О себе" required="required" minLength="2" maxLength="200"
          id="profession-input"/>
      <span className="form__input-error profession-input-error"></span>
    </label>
    </PopupWithForm>)
}

export default EditProfilePopup;
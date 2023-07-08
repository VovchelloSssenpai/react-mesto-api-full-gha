import  { useRef, useEffect}  from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isLoading, onUpdateAvatar, isOpen, onClose}){
    const inputRef = useRef('');
    function handleSubmit(e){
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value)
    }
useEffect(()=>{inputRef.current.value = ""},[isOpen])

    return(  
        <PopupWithForm title="Обновить Аватар" text={isLoading ? "Сохранение..." : "Сохранить"} name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                   <label className="form__label">
                     <input ref={inputRef} type="url" className="form__input form__input_el_link" name="link"
                         placeholder="Ссылка на Аватар" required="required" id="avatar-input"/>
                     <span className="form__input-error avatar-input-error"></span>
                   </label>
      </PopupWithForm>
        )
}

export default EditAvatarPopup;
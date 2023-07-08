import  { useState, useEffect}  from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({onAddCard, isOpen, onClose, isLoading}){
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(()=>{
      setName(''); setLink('')
      },[isOpen])
      
    function handleName(e) {
        setName(e.target.value);
      }

      function handleLink(e) {
        setLink(e.target.value);
      }

    function handleSubmit(e){
        e.preventDefault();
        onAddCard({name, link})
    }

    return(  
        <PopupWithForm title="Новое Место" 
                      text={isLoading ? "Создание..." : "Создать"} 
                      name="add" 
                      isOpen={isOpen} 
                      onClose={onClose} 
                      onSubmit={handleSubmit} >
        <label className="form__label">
          <input value={name} onChange={handleName} type="text" className="form__input form__input_el_picture" name="name"
              placeholder="Название" required="required" id="picture-input" minLength="2" maxLength="30"/>
          <span className="form__input-error picture-input-error"></span>
      </label>
      <label className="form__label">
          <input value={link} onChange={handleLink} type="url" className="form__input form__input_el_link" name="link"
              placeholder="Ссылка на картинку" required="required" id="link-input"/>
          <span className="form__input-error link-input-error"></span>
      </label>
        </PopupWithForm>
        )
}

export default AddPlacePopup;
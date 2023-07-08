
function PopupWithForm(props) {
      const className = `popup popup_${props.name} ${props.isOpen && `popup_opened`}`

    return (
        <div className= {className} >
        <div className="popup__body">
            <h2 className="popup__header">{`${props.title}`}</h2>
            <form action="submit" className="form" name={`${props.name}`} noValidate onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className="form__submit-button">{props.text}</button>
            </form>
            <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        </div>
    </div>
    
    );
  }
  
  export default PopupWithForm;






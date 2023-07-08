import AuthorizationFrom from './AuthorizationForm'


function Login({onAuthorize, setProfileData, formValue, setFormValue, isLoading }) {

const handleChange = (e) => {  
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
}

const handleSubmit = (e) => {
    e.preventDefault();

  onAuthorize(formValue)

  const { email } = formValue;
  setProfileData(email);
}

  return (
      <div className="signpage">
          <h2 className="signpage__header">Вход</h2>
          <AuthorizationFrom handleChange={handleChange} handleSubmit={handleSubmit} formValue={formValue} button={isLoading ? "Вход..." : "Войти"} />
      </div>
  );
}

export default Login;
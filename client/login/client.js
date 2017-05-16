let NavClass;
let navRender;
let aboutRender;


const handleLogin = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("#user").val() == '' || $("#pass").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }
  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() =='' ) {
    handleError("RAWR! All fields are required");
    return false;
  }

  if($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }


  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

const renderLogin = function() {
  return (
    <form id="loginForm" name="loginForm"
      onSubmit={this.handleSubmit}
      action="/login"
      method="POST"
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username"/>
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password"/>
      <input type="hidden" name="_csrf" value={this.props.csrf}/>
      <input className="formSubmit" type="submit" value="Sign in" />
    </form>
  );
};

const renderSignup = function() {
  return (
    <form id="signupForm"
      name="signupForm"
      onSubmit={this.handleSubmit}
      action="/signup"
      method="POST"
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username" />
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password" />
      <label htmlFor="pass">Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="retype password" />
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
  );
};

const createLoginWindow = function(csrf) {
  const LoginWindow = React.createClass({
    handleSubmit: handleLogin,
    render: renderLogin
  });
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = function (csrf) {
  console.dir("click");
  const SignupWindow = React.createClass({
    handleSubmit: handleSignup,
    render: renderSignup
  });

  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

//RENDER PREMIUM Page
const renderAbout = function() {
  return (
  <div>

        <h2 className="aboutdesc"> 
    <br />
    Enter into a creative space where you challenge the possibilities of the monster world.  Everyday we run the regular work flow and forget to strech our minds.  Create a monster friend how you want and learn some fun facts along the way.  Each monster might give you a brand new perspective. How many facts can you collect? 
    <br /><br /> 
    Monster Mash is meant to open your mind and build an open environment to enhace creativity.  If children can imagine, what is stopping you?
    <br /><br />
       <img src="/assets/img/Pink03.png" alt="monster" className="monstex" />
    </h2>
  

    </div>
  );
};

const setup = function(csrf) {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  
   //Settings for the account password change
  AboutClass = React.createClass({
        render: renderAbout
  });
  
  
  NavClass = React.createClass({
    render: function(){
      return (  
        <div>
        <input value='About' onClick={this.loadAbout} name="about" type='button' id="setbut"/> 
        </div>
      )   
    },
    loadAbout: function(e){
      aboutRender = ReactDOM.render(
      <AboutClass />, document.querySelector("#content")
        
      )
    }
  });
   
  navRender = ReactDOM.render(
   <NavClass />, document.querySelector(".navadd")
   )

  createLoginWindow(csrf); //default view
}
                               

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

$(document).ready(function() {
  getToken();
});
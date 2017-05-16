let NavClass;
let navRender;
let aboutRender;

const handleLogin = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("RAWR! Username or password is empty");
    return false;
  }
  console.log($("input[name=_csrf]").val());

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

const handleSignup = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

const renderLogin = function () {
  return React.createElement(
    "form",
    { id: "loginForm", name: "loginForm",
      onSubmit: this.handleSubmit,
      action: "/login",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "username" },
      "Username: "
    ),
    React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign in" })
  );
};

const renderSignup = function () {
  return React.createElement(
    "form",
    { id: "signupForm",
      name: "signupForm",
      onSubmit: this.handleSubmit,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    },
    React.createElement(
      "label",
      { htmlFor: "username" },
      "Username: "
    ),
    React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
    React.createElement(
      "label",
      { htmlFor: "pass" },
      "Password: "
    ),
    React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
  );
};

const createLoginWindow = function (csrf) {
  const LoginWindow = React.createClass({
    displayName: "LoginWindow",

    handleSubmit: handleLogin,
    render: renderLogin
  });
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

const createSignupWindow = function (csrf) {
  console.dir("click");
  const SignupWindow = React.createClass({
    displayName: "SignupWindow",

    handleSubmit: handleSignup,
    render: renderSignup
  });

  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

//RENDER PREMIUM Page
const renderAbout = function () {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      { className: "aboutdesc" },
      React.createElement("br", null),
      "Enter into a creative space where you challenge the possibilities of the monster world.  Everyday we run the regular work flow and forget to strech our minds.  Create a monster friend how you want and learn some fun facts along the way.  Each monster might give you a brand new perspective. How many facts can you collect?",
      React.createElement("br", null),
      React.createElement("br", null),
      "Monster Mash is meant to open your mind and build an open environment to enhace creativity.  If children can imagine, what is stopping you?",
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("img", { src: "/assets/img/Pink03.png", alt: "monster", className: "monstex" })
    )
  );
};

const setup = function (csrf) {
  const loginButton = document.querySelector("#loginButton");
  const signupButton = document.querySelector("#signupButton");

  signupButton.addEventListener("click", e => {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener("click", e => {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });

  //Settings for the account password change
  AboutClass = React.createClass({
    displayName: "AboutClass",

    render: renderAbout
  });

  NavClass = React.createClass({
    displayName: "NavClass",

    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement("input", { value: "About", onClick: this.loadAbout, name: "about", type: "button", id: "setbut" })
      );
    },
    loadAbout: function (e) {
      aboutRender = ReactDOM.render(React.createElement(AboutClass, null), document.querySelector("#content"));
    }
  });

  navRender = ReactDOM.render(React.createElement(NavClass, null), document.querySelector(".navadd"));

  createLoginWindow(csrf); //default view
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
const handleError = message => {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

const redirect = response => {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function (xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

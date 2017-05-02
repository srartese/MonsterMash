let domoRenderer; // Domo Renderer component
let domoForm; // Domo Add Form Render component
let DomoFormClass; // Domo Form React UI class
let DomoListClass; //Domo List React UI class

const handleDomo = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoHome").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    domoRenderer.loadDomosFromServer();
  });

  return false;
};

const renderDomo = function () {
  return React.createElement(
    "form",
    { id: "domoForm",
      onSubmit: this.handleSubmit,
      name: "domoForm",
      action: "/maker",
      method: "POST",
      className: "domoForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
    React.createElement(
      "label",
      { htmlFor: "home" },
      "Home Origin: "
    ),
    React.createElement("input", { id: "domoHome", type: "text", name: "home", placeholder: "Home Origin" }),
     React.createElement(
      "label",
      { htmlFor: "eyes" },
      "Eyes: "
    ),
    React.createElement("input", { type: "radio", name: "eyes", value: "2" }),
    React.createElement("input", { type: "radio", name: "eyes", value: "1" }), 
    
    React.createElement(
      "label",
      { htmlFor: "horns" },
      "horns: "
    ),
    React.createElement("input", { type: "radio", name: "horns", value: "0" }),
    React.createElement("input", { type: "radio", name: "horns", value: "1" }), 
    React.createElement("input", { type: "radio", name: "horns", value: "3" }),
    
     React.createElement(
      "label",
      { htmlFor: "color" },
      "color: "
    ),
    React.createElement("input", { type: "radio", name: "color", value: "Green" }),
    React.createElement("input", { type: "radio", name: "color", value: "Orange" }), 
    React.createElement("input", { type: "radio", name: "color", value: "Blue" }),
    
    
    React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
  );
};

const renderDomoList = function () {
  if (this.state.data.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  const domoNodes = this.state.data.map(function (domo) {
    return React.createElement(
      "div",
      { key: domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name,
        " "
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " Age: ",
        domo.age,
        " "
      ),
      React.createElement(
        "h3",
        { className: "domoHome" },
        " Home: ",
        domo.home,
        " "
      ), 
      React.createElement(
        "h3",
        { className: "domoEyes" },
        " Eyes: ",
        domo.eyes,
        " "
      ),
         React.createElement(
        "h3",
        { className: "domoColor" },
        " Color: ",
        domo.color,
        " "
      ), 
    );
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

const setup = function (csrf) {
  DomoFormClass = React.createClass({
    displayName: "DomoFormClass",

    handleSubmit: handleDomo,
    render: renderDomo
  });

  DomoListClass = React.createClass({
    displayName: "DomoListClass",

    loadDomosFromServer: function () {
      sendAjax('GET', '/getDomos', null, function (data) {
        this.setState({ data: data.domos });
      }.bind(this));
    },
    getInitialState: function () {
      return { data: [] };
    },
    componentDidMount: function () {
      this.loadDomosFromServer();
    },
    render: renderDomoList
  });

  domoForm = ReactDOM.render(React.createElement(DomoFormClass, { csrf: csrf }), document.querySelector("#makeDomo"));

  domoRenderer = ReactDOM.render(React.createElement(DomoListClass, null), document.querySelector("#domos"));
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

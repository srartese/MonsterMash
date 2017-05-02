let domoRenderer; // Domo Renderer component
let domoForm; // Domo Add Form Render component
let DomoFormClass; // Domo Form React UI class
let DomoListClass; //Domo List React UI class
let DetailsClass; //Domo deatil React UI class
let MonsterClass; //Monster, so each has their own React UI class
let MakerClass; //Monster makerclass
let PlaygroundClass;
let navRender;
let NavClass;
let settingsRender;
let PasswordWindow;

const handleDomo = e => {
  e.preventDefault();
  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoHome").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    //domoRenderer.loadDomosFromServer();
    domoRenderer.dynam();
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
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Monster Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Monster Age" }),
    React.createElement(
      "label",
      { htmlFor: "home" },
      "Home Origin: "
    ),
    React.createElement("input", { id: "domoHome", type: "text", name: "home", placeholder: "Home Origin" }),
    React.createElement("br", null),
    React.createElement("br", null),
    React.createElement(
      "div",
      { className: "styleIn" },
      React.createElement(
        "div",
        { id: "domoEyes" },
        React.createElement(
          "label",
          { htmlFor: "eyes" },
          "Eyes: "
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "eyes", value: "1" }),
          "One"
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "eyes", value: "3" }),
          "Three"
        )
      ),
      React.createElement(
        "div",
        { id: "domoHorns" },
        React.createElement(
          "label",
          { htmlFor: "horns" },
          "Horns: "
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "horns", value: "0" }),
          "None"
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "horns", value: "2" }),
          "Two"
        )
      ),
      React.createElement(
        "div",
        { id: "domoColor" },
        React.createElement(
          "label",
          { htmlFor: "color" },
          "Color: "
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "color", value: "Green" }),
          "Green"
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "color", value: "Orange" }),
          "Orange"
        ),
        React.createElement(
          "label",
          null,
          React.createElement("input", { type: "radio", name: "color", value: "Blue" }),
          "Blue"
        )
      ),
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
      React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
    )
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

  const listScope = this;
  const domoNodes = this.state.data.map(function (domo) {
    //check 
    // <h3 className="domoEyes"> Eyes: {domo.eyes} </h3>
    //  <h3 className="domoHorns"> Horns: {domo.horns} </h3>
    //to which display imag
    const stringthing = "/assets/img/" + domo.color + domo.horns + domo.eyes + ".png";

    return React.createElement(MonsterClass, {
      domoid: domo._id,
      domoname: domo.name,
      domoage: domo.age,
      domohome: domo.home,
      stringthing: stringthing,
      monstercolor: domo.color,
      monsterhorns: domo.horns,
      monstereyes: domo.eyes,
      key: domo._id
    });
  });

  return React.createElement(
    "div",
    { className: "domoList" },
    domoNodes
  );
};

//HANDLES THE VALIDATION OF PASSWORD CHANGE FORM
const handlePassChange = e => {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);
  if ($("#pass0").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("RAWR! Passwords do not match");
    return false;
  }
  console.log($("input[name=_csrf]").val());

  console.log($("#pass").val());
  console.log($("#pass2").val());
  console.log($("#pass0").val());
  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);

  return false;
};

//RENDER PASSWORD CHANGE FORM
const renderPassChange = function () {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      { className: "deh1" },
      " Account Password Reset"
    ),
    React.createElement(
      "form",
      { id: "changePassForm",
        name: "changePassForm",
        onSubmit: this.handlePassSubmit,
        action: "/password",
        method: "POST",
        className: "changePassForm"
      },
      React.createElement(
        "label",
        { htmlFor: "pass0" },
        "Current Password: "
      ),
      React.createElement("input", { id: "pass0", type: "password", name: "pass", placeholder: "current password" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "pass" },
        "New Password: "
      ),
      React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "new password" }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "pass2" },
        "New Password: "
      ),
      React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype new password" }),
      React.createElement("br", null),
      React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
      React.createElement("input", { className: "passSubmit", type: "submit", value: "Change Password" })
    ),
    React.createElement(
      "a",
      { href: "/maker" },
      " Back to Monsters "
    )
  );
};

const setup = function (csrf) {
  //TO GET RANDOM THINGS FOR PLAYGROUND  
  const colorarray = ["blue", "orange", "green"];
  const eyearray = ["1", "3"];
  const hornarray = ["0", "2"];
  const namearray = ["Hoa", "Natacha", "Cornelia", "Leesa", "Laraine", "Shaunna", "Yen", "Joie", "Bulah", "Aisha", "Alysia", "Deandra", "Lorenzo", "Hillary", "Krista", "Theola", "Lulu", "Yesenia", "Rosetta", "Rosalia", "Cecilia", "Shaneka", "Zelma", "Mathilda", "Maranda", "Elza", "Dorthy", "Reginald", "Sherron", "Lyndsey"];

  const activityarray = ["try to type names with eyes closed.", "lick elbows.", "hug as many people as possible in a minute.", "watch movies", "help old people cross the road", "bake cookies", "color", "program cool things", "do hair", "use Socks As Nunchucks.", "draw pictures in total darkness and see how they turn out.", "build forts.", "go on walks.", "make blankets.", "sleep.", "eat.", "learn new things.", "tell jokes"];

  var randcolor = colorarray[Math.floor(Math.random() * colorarray.length)];
  var randeye = eyearray[Math.floor(Math.random() * eyearray.length)];
  var randhorn = hornarray[Math.floor(Math.random() * hornarray.length)];
  var randname = namearray[Math.floor(Math.random() * namearray.length)];
  var randactivity = activityarray[Math.floor(Math.random() * activityarray.length)];
  const alldomo = "/assets/img/" + randcolor + randhorn + randeye + ".png";

  // Creative Playground
  PlaygroundClass = React.createClass({
    displayName: "PlaygroundClass",

    render: function () {
      return React.createElement(
        "div",
        { className: "whole" },
        React.createElement(
          "h1",
          null,
          " Monster Inspire-Ground"
        ),
        React.createElement(
          "div",
          { className: "play" },
          React.createElement("img", { src: alldomo, alt: "domo face", className: "monsterInspireFace" }),
          React.createElement(
            "h2",
            null,
            " ",
            randname,
            " loves to ",
            randactivity,
            " "
          ),
          React.createElement("br", null),
          React.createElement(
            "a",
            { href: "/maker" },
            " Back to Monsters "
          )
        )
      );
    }
  });

  //Settings for the account password change
  SettingsClass = React.createClass({
    displayName: "SettingsClass",

    handlePassSubmit: handlePassChange,
    render: renderPassChange
  });

  //When you click a single monster you get details
  DetailsClass = React.createClass({
    displayName: "DetailsClass",

    render: function () {
      return React.createElement(
        "div",
        { className: "details" },
        React.createElement(
          "h1",
          { className: "deh1" },
          " Meet  ",
          this.props.domoname,
          "! "
        ),
        React.createElement("img", { src: this.props.stringthing, alt: "domo face", className: "monmeet" }),
        React.createElement("br", null),
        React.createElement(
          "h3",
          { className: "monsterage" },
          " Age: ",
          this.props.domoage,
          " "
        ),
        React.createElement(
          "h3",
          { className: "domoHome" },
          " Home: ",
          this.props.domohome,
          " "
        ),
        React.createElement(
          "h3",
          { className: "domoColor" },
          " Color: ",
          this.props.monstercolor,
          " "
        ),
        React.createElement(
          "h3",
          { className: "domoEyes" },
          " Eyes: ",
          this.props.monstereyes,
          " "
        ),
        React.createElement(
          "h3",
          { className: "domoHorns" },
          " Horns: ",
          this.props.monsterhorns,
          " "
        ),
        React.createElement(
          "a",
          { href: "/maker" },
          " Back to Monsters "
        )
      );
    }
  });

  MonsterClass = React.createClass({
    displayName: "MonsterClass",

    render: function () {
      return React.createElement(
        "div",
        { className: "domo" },
        React.createElement("input", { value: "View Monster", onClick: this.loadthings, name: this.props.domoid, type: "button", id: "monbtt" }),
        React.createElement("img", { src: this.props.stringthing, alt: "domo face", className: "domoFace" }),
        React.createElement(
          "h3",
          { className: "domoName" },
          " Name: ",
          this.props.domoname,
          " "
        ),
        React.createElement(
          "h3",
          { className: "domoAge" },
          " Age: ",
          this.props.domoage,
          " "
        )
      );
    },
    loadthings: function (e) {
      //console.dir(e);
      //console.dir(this.props.domoid);
      //console.log(this.props.domoname);
      detailsRender = ReactDOM.render(React.createElement(DetailsClass, {
        domoname: this.props.domoname,
        domoage: this.props.domoage,
        stringthing: this.props.stringthing,
        domohome: this.props.domohome,
        monstereyes: this.props.monstereyes,
        monstercolor: this.props.monstercolor,
        monsterhorns: this.props.monsterhorns
      }), document.querySelector(".appmain"));
    }
  });

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

  MakerClass = React.createClass({
    displayName: "MakerClass",

    dynam: function () {
      this.refs.listChild.loadDomosFromServer();
    },
    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement(DomoFormClass, { csrf: csrf }),
        ",",
        React.createElement(DomoListClass, { ref: "listChild" }),
        React.createElement("input", { value: "Get Inspired!", onClick: this.loadPlayground, name: "inspiration", type: "button", id: "monpla" })
      );
    },
    loadPlayground: function (e) {

      playgroundRender = ReactDOM.render(React.createElement(PlaygroundClass, null), document.querySelector(".appmain"));
    }
  });

  NavClass = React.createClass({
    displayName: "NavClass",

    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement("input", { value: "Settings", onClick: this.loadSettings, name: "settings", type: "button", id: "setbut" })
      );
    },
    loadSettings: function (e) {

      settingsRender = ReactDOM.render(React.createElement(SettingsClass, { csrf: csrf }), document.querySelector(".appmain"));
    }
  });

  domoRenderer = ReactDOM.render(React.createElement(MakerClass, null), document.querySelector(".appmain"));

  navRender = ReactDOM.render(React.createElement(NavClass, null), document.querySelector(".navadd"));
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
    //console.log(result.csrfToken);
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

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


const handleDomo = (e) => {
  e.preventDefault();
   $("#domoMessage").animate({width:'hide'},350);
    
  if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoHome").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  
  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
    //domoRenderer.loadDomosFromServer();
    domoRenderer.dynam();
  });
  
  return false;
};

const renderDomo = function() {
  return (
    <form id="domoForm"
      onSubmit={this.handleSubmit}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Monster Name"/>
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Monster Age"/>
      <label htmlFor="home">Home Origin: </label>
      <input id="domoHome" type="text" name="home" placeholder="Home Origin" />
      
    <br />
    <br />
    <div className="styleIn">
      <div id="domoEyes">      
        <label htmlFor="eyes">Eyes: </label>
        <label><input type="radio" name="eyes" value="1" />One</label>
        <label><input type="radio" name="eyes" value="3" />Three</label>
      </div>

      <div id="domoHorns">      
        <label htmlFor="horns">Horns: </label>
        <label><input type="radio" name="horns" value="0" />None</label>
        <label><input type="radio" name="horns" value="2" />Two</label>
      </div>
     <div id="domoColor">      
        <label htmlFor="color">Color: </label>
        <label><input type="radio" name="color" value="Green" />Green</label>
        <label><input type="radio" name="color" value="Orange" />Orange</label>
        <label><input type="radio" name="color" value="Blue" />Blue</label>
      </div>
      <input type="hidden" name="_csrf" value={this.props.csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
      </div>
    
    </form>
  )
}

const renderDomoList = function() {
  if(this.state.data.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }
  
  const listScope = this;
  const domoNodes = this.state.data.map(function(domo) {
     //check 
       // <h3 className="domoEyes"> Eyes: {domo.eyes} </h3>
      //  <h3 className="domoHorns"> Horns: {domo.horns} </h3>
      //to which display imag
    const stringthing = "/assets/img/"+domo.color+domo.horns+domo.eyes+".png"

    return (
        <MonsterClass 
          domoid={domo._id} 
          domoname={domo.name} 
          domoage = {domo.age}
          domohome = {domo.home}
          stringthing = {stringthing}
          monstercolor={domo.color}
          monsterhorns={domo.horns}
          monstereyes={domo.eyes}
          key={domo._id}
          />
    );
  });


  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

//HANDLES THE VALIDATION OF PASSWORD CHANGE FORM
const handlePassChange = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);
  if( $("#pass0").val() == '' || $("#pass").val() == '' || $("#pass2").val() =='' ) {
    handleError("RAWR! All fields are required");
    return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()) {
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
const renderPassChange = function() {
  return (
  <div>
       <h1 className="deh1"> Account Password Reset</h1>
          <form id="changePassForm"
            name="changePassForm"
            onSubmit={this.handlePassSubmit}
            action="/password"
            method="POST"
            className="changePassForm"
          >
          <label htmlFor="pass0">Current Password: </label>
          <input id="pass0" type="password" name="pass" placeholder="current password" /> 
            <br />
            <br />
          <label htmlFor="pass">New Password: </label>
          <input id="pass" type="password" name="pass" placeholder="new password" />
              <br />
          <label htmlFor="pass2">New Password: </label>
          <input id="pass2" type="password" name="pass2" placeholder="retype new password" />
               <br />
          <input type="hidden" name="_csrf" value={this.props.csrf} />
          <input className="passSubmit" type="submit" value="Change Password" />
        </form>
        <a href="/maker"> Back to Monsters </a>
  </div>
  );
};

const setup = function(csrf) {
      //TO GET RANDOM THINGS FOR PLAYGROUND  
    const colorarray = ["Blue", "Orange", "Green"];
      const eyearray = ["1", "3"];
      const hornarray = ["0", "2"];
      const namearray = ["Hoa", "Natacha", "Cornelia","Leesa","Laraine","Shaunna", "Yen","Joie","Bulah","Aisha","Alysia","Deandra","Lorenzo","Hillary","Krista","Theola","Lulu","Yesenia","Rosetta","Rosalia","Cecilia","Shaneka","Zelma","Mathilda","Maranda","Elza","Dorthy","Reginald","Sherron","Lyndsey"];
      
      const activityarray = ["try to type names with eyes closed.", "lick elbows.", "hug as many people as possible in a minute.", "watch movies", "help old people cross the road", "bake cookies", "color", "program cool things", "do hair", "use Socks As Nunchucks.", "draw pictures in total darkness and see how they turn out.", "build forts.", "go on walks.", "make blankets.", "sleep.", "eat.", "learn new things.", "tell jokes"];

      var randcolor = colorarray[Math.floor(Math.random() * colorarray.length)];
      var randeye = eyearray[Math.floor(Math.random() * eyearray.length)];
      var randhorn = hornarray[Math.floor(Math.random() * hornarray.length)];
      var randname = namearray[Math.floor(Math.random() * namearray.length)];
      var randactivity = activityarray[Math.floor(Math.random() * activityarray.length)];
      const alldomo = "/assets/img/"+randcolor+randhorn+randeye+".png"
  
  // Creative Playground
  PlaygroundClass = React.createClass({
   render: function(){
      return (
      <div className="whole">
        <h1> Monster Inspire-Ground</h1>
        <div className="play">
            <img src={alldomo} alt="domo face" className="monsterInspireFace" />
          <h2> {randname} loves to {randactivity} </h2>
        <br />
          <a href="/maker"> Back to Monsters </a>
        </div>
      </div>
      )
   }
  }); 
  
  //Settings for the account password change
  SettingsClass = React.createClass({
         handlePassSubmit: handlePassChange,
        render: renderPassChange
  });
  
  
  //When you click a single monster you get details
  DetailsClass = React.createClass({
      render: function(){
      return (
      <div className="details">
        <h1 className="deh1"> Meet  {this.props.domoname}! </h1>
         <img src={this.props.stringthing} alt="domo face" className="monmeet"/>
        <br />
          <h3 className="monsterage"> Age: {this.props.domoage} </h3>
          <h3 className="domoHome"> Home: {this.props.domohome} </h3>
          <h3 className="domoColor"> Color: {this.props.monstercolor} </h3>
          <h3 className="domoEyes"> Eyes: {this.props.monstereyes} </h3>
          <h3 className="domoHorns"> Horns: {this.props.monsterhorns} </h3>
                  <a href="/maker"> Back to Monsters </a>
      </div>
    )
    }
  });

  MonsterClass = React.createClass({
    render: function(){
      return (
      <div className="domo">
        <input value='View Monster' onClick={this.loadthings} name={this.props.domoid} type='button' id="monbtt"/>
         <img src={this.props.stringthing} alt="domo face" className="domoFace" />
          <h3 className="domoName"> Name: {this.props.domoname} </h3>
          <h3 className="domoAge"> Age: {this.props.domoage} </h3>
      </div>
      )
    },
    loadthings: function(e){
      //console.dir(e);
      //console.dir(this.props.domoid);
      //console.log(this.props.domoname);
      detailsRender = ReactDOM.render(
        <DetailsClass 
            domoname={this.props.domoname}
            domoage={this.props.domoage}
            stringthing={this.props.stringthing}
            domohome={this.props.domohome}
            monstereyes= {this.props.monstereyes}
            monstercolor= {this.props.monstercolor}
            monsterhorns= {this.props.monsterhorns}
        />, document.querySelector(".appmain")
      )
    }
  });
  
  DomoFormClass = React.createClass({
    handleSubmit: handleDomo,
    render: renderDomo,
  });

  DomoListClass = React.createClass({
    loadDomosFromServer: function() {
      sendAjax('GET', '/getDomos', null, function(data) {
        this.setState({data:data.domos});
      }.bind(this));
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadDomosFromServer();
    },
    render: renderDomoList
  }); 

  MakerClass = React.createClass({
     dynam: function(){
      this.refs.listChild.loadDomosFromServer();
    },
    render: function(){
      return (
        <div>
      <DomoFormClass csrf={csrf} />,
      <DomoListClass ref="listChild"/>
        <input value='Get Inspired!' onClick={this.loadPlayground} name="inspiration" type='button' id="monpla"/>  
        </div>
        )
    },
    loadPlayground: function(e){
    
      playgroundRender = ReactDOM.render(
        <PlaygroundClass />, document.querySelector(".appmain")
      )
    }
 });
  
  NavClass = React.createClass({
    render: function(){
      return (  
        <div>
          <input value='Settings' onClick={this.loadSettings} name="settings" type='button' id="setbut"/>  

        </div>
      )   
    },
    loadSettings: function(e){
    
      settingsRender = ReactDOM.render(
      <SettingsClass csrf={csrf}/>, document.querySelector(".appmain")
      )
    }
  });
  
  domoRenderer = ReactDOM.render(
   <MakerClass />, document.querySelector(".appmain")
   )
   
  navRender = ReactDOM.render(
   <NavClass />, document.querySelector(".navadd")
   )
}

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
    //console.log(result.csrfToken);
  });
}

$(document).ready(function() {
  getToken();
});

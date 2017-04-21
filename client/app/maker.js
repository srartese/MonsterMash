let domoRenderer; // Domo Renderer component
let domoForm; // Domo Add Form Render component
let DomoFormClass; // Domo Form React UI class
let DomoListClass; //Domo List React UI class

const handleDomo = (e) => {
  e.preventDefault();

  $("#domoMessage").animate({width:'hide'},350);

  if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoHome").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
    domoRenderer.loadDomosFromServer();
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
      <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
      
      <label htmlFor="home">Home Origin: </label>
      <input id="domoHome" type="text" name="home" placeholder="Home Origin" />
    
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

  const domoNodes = this.state.data.map(function(domo) {
     //check 
       // <h3 className="domoEyes"> Eyes: {domo.eyes} </h3>
      //  <h3 className="domoHorns"> Horns: {domo.horns} </h3>
      //to which display image
    const stringthing = "/assets/img/"+domo.color+domo.horns+domo.eyes+".png"

    return (
      <div key={domo._id} className="domo">
       <img src={stringthing} alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name} </h3>
        <h3 className="domoAge"> Age: {domo.age} </h3>
        <h3 className="domoHome"> Home: {domo.home} </h3>
      </div>
    );
  });

  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

const setup = function(csrf) {
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

  domoForm = ReactDOM.render(
    <DomoFormClass csrf={csrf} />, document.querySelector("#makeDomo")
  );

  domoRenderer = ReactDOM.render(
    <DomoListClass />, document.querySelector("#domos")
  );
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
}

$(document).ready(function() {
  getToken();
});

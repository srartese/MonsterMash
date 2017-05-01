monsterSingleClass = React.createClass({
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
  
  monsterView = ReactDOM.render(
    <monsterSingleClass csrf={csrf} />, document.querySelector("#singleMon")
  );


  //RENDER SINGLE MONSTER NODE
const singleMonster = this.state.data.map(function(domo) {
  const stringthing = "/assets/img/"+domo.color+domo.horns+domo.eyes+".png"
 return (
      <div key={domo._id} className="domo">
       <img src={stringthing} alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name} </h3>
        <h3 className="domoAge"> Age: {domo.age} </h3>
        <h3 className="domoHome"> Home: {domo.home} </h3>
      </div>
    );
  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
});


const monsterbutton = document.getElementById("monsterbttn");

  
  //document.addEventListener('DOMContentLoaded', function () {
    console.dir("dom loaded");
 

    monsterbutton.addEventListener("click", e => {
    e.preventDefault();
    console.dir("cloickcc");
    createMonsterView();
    return false;
  });
});

 React.createElement(
        "a",
        { href: "/minfo", className: "domoHome", value: domo.name },
        " Home: ",
        domo.name,
        " "
      )
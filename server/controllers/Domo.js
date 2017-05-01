const models = require('../models');
const Domo = models.Domo;
const Account = models.Account;


const password = (request, response) => {
  const req = request;
  const res = response;

//  // cast to strings to cover up some security flaws
//  req.body.username = `${req.body.username}`;
//  req.body.pass = `${req.body.pass}`;
//  req.body.pass2 = `${req.body.pass2}`;
//
//  if (!req.body.username || !req.body.pass || !req.body.pass2) {
//    return res.status(400).json({ error: 'RAWR! All fields are required' });
//  }
//
//  if (req.body.pass !== req.body.pass2) {
//    return res.status(400).json({ error: 'RAWR! Passwords do not match' });
//  }
//
//  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
//    const accountData = {
//      username: req.body.username,
//      salt,
//      password: hash,
//    };
//
//    const newAccount = new Account.AccountModel(accountData);
//
//    const savePromise = newAccount.save();
//
//    savePromise.then(() => {
//      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({ redirect: '/maker' });
    //});

//    savePromise.catch((err) => {
//      console.log(err);
//
//      if (err.code === 110000) {
//        return res.status(400).json({ error: 'Username already in use.' });
//      }
      console.log("asdasd" + res);
      //return res.status(400).json({ error: 'An error occured' });
    //});
  //});
};


//MAKER PAGE TO MAKE MONSTERS
const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

//MAKE MONSTER
const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.home) {
      return res.status(400).json({ error: 'Rawr! All items required' });
    
  }
  if (!req.body.eyes || !req.body.color || !req.body.horns) {
      return res.status(400).json({ error: 'Rawr! All items required' });
    }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    home: req.body.home,
    eyes: req.body.eyes,
    horns: req.body.horns,
    color: req.body.color,
    owner: req.session.account._id,
  };
  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ domos: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
module.exports.password = password;
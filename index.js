const axios = require('axios');

const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      return true;
    }
  }

  module.exports = {
      login:   async function(email, password) {
        if(!isEmail(email) )
        await axios.post("http://172.16.28.58:5001/api" + "/users/login", { email, password })
        .then(res => {
            console.log('ici', res)
            if(res.data.data.verification)
                return {verification : true}
            else
                return {verification: false}
          })
          .catch(err => {
              console.log('ici', err)
              console.log(err)
          });
      },
      register: async function(email, firstname, lastname, password, pass2) {
        if(password !== pass2)
            return {error: "Les mots de passe ne correspondent pas"}
        if(lastname.length < 2 || firstname < 2) 
            return {error: "Le prénom ou le nom est trop court"}
      if(!isEmail(email))
        await axios.post(
            "http://172.16.28.58:5001/api" + "/users/create",
            {
                email,
                firstname,
                lastname,
                password
              }
          ).then(res => {return true})
          .catch(err => {
            return err
          });
      }
  }

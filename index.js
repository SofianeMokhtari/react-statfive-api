const axios = require('axios');

const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      return true;
    }
  }

  module.exports = async function login(email, password) {
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
  };
import axios from 'axios'

const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      return true;
    }
  }

module.exports = login = async (email, password) => {
    if(!isEmail(email) )
    await axios.post([API_URL] + "/users/login", { email, password })
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
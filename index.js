const axios = require('axios');

const isEmail = (val) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regEmail.test(val)){
      return true;
    }
  }

  module.exports = {
      login:   async function(API_URL, email, password) {
        if(!isEmail(email) )
        await axios.post(API_URL + "/users/login", { email, password })
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
      register: async function(API_URL, email, firstname, lastname, password, pass2) {
        if(password !== pass2)
            return {error: "Les mots de passe ne correspondent pas"}
        if(lastname.length < 2 || firstname < 2) 
            return {error: "Le prénom ou le nom est trop court"}
      if(!isEmail(email))
        await axios.post(
            API_URL + "/users/create",
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
      },
      getAverageGoal: async function(API_URL) {
        await axios.get(
          API_URL + `/team/average_team`).then(res => {
              res.data.data.sort((a, b) => b.moyenne_goal - a.moyenne_goal);
              return res.data.data
          })
        .catch(err => {
          console.log(err)
          return err
        });
      },
      getAllTeam: async function(API_URL) {
        await axios.get(
          API_URL + `/team/all_team`).then(res => {
              let arrayObj = res.data.data
              arrayObj = arrayObj.map(item => {
                  return {
                    value: item.id,
                    label: item.name
                  };
                });
              return arrayObj
          })
        .catch(err => {
          console.log(err)
          return err
        });
      },
      addVideo: async function(API_URL, mp4, teamOne, teamTwo, token) {
        var bodyFormData = new FormData();
        bodyFormData.append('video', mp4);
        bodyFormData.append('team_one', teamOne);
        bodyFormData.append('team_two', teamTwo);
    
        var headers = {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          'api-token': token
        }
        await axios.post(
            API_URL + `/match`,
            bodyFormData, { headers: headers })
          .then(res => {
            return res
          })
          .catch(err => {
           console.log(err)
           return err
          }
          );
      },
      createTeam: async function(API_URL, teamName, arrayTeam) {
        await axios.post(
          API_URL + `/team/create_team`,
          [{name: teamName, player: arrayTeam }])
        .then(res => {
          return res
        })
        .catch(err => {
          console.log('Error', err)
          return err
        }
        );
      },
      matchListHistoric: async function(API_URL) {
        await axios.get(
          API_URL + `/match/all_match`).then(res => {
            return res.data.data
          })
        .catch(err => {
          console.log(err)
          return err
        });
      },
      updateProfil: async function(API_URL, idUser, description, post) {
        await axios.put(
          API_URL + `/users/${idUser}`,
          { description, post})
        .then(res => {
            return res
        })
        .catch(err => {
          console.log('Erreur', err)
          return err
        }
        );
      },
      getTeam: async function(API_URL) {
        await axios.get(
          API_URL + `/team/all_team`).then(res => {
              return res.data.data
          })  
        .catch(err => {
          console.log(err)
          return err
        });
      },
      getMyTeam: async function(API_URL, teamID) {
        let team = []
        teamID && teamID.map(async (elm) => {
          await axios.get(
            API_URL + `/team/${elm.id}`).then(res => {
              const arrayTeam = res.data.data.user
              if(arrayTeam.length === 5) {
                if(arrayTeam.find(o => o.id === userID)) {
                  team.push(arrayTeam)
                }
              }
              return arrayTeam
            })  
          .catch(err => {
            console.log(err)
            return err
          });
        })
      },
      verification: async function(API_URL, otp, token, idUser) {
        await axios.get(
          API_URL + `/users/verification_code/${otp.toUpperCase()}`,
          {
              headers: {
              "api-token": token
              }
          }).then(async (res) => {
              const newData = await axios.get(API_URL + `/users/${idUser}`)
              return {data: newData.data.data, verification: true}
          })
      .catch(err => {
          console.log(err);
          return err
      });
      }

  }

const axios = require('axios');
import { httpClient } from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

    const isEmail = (val) => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(val)){
        return true;
        }
    }

    const login = (API_URL, email, password) => {
        if(!isEmail(email)) {
            const result = axios.post(API_URL + "/users/login", { email, password })
            .then(res => {
                AsyncStorage.setItem('userValue', 'testttestestest')
                return res.data
            }).catch((err) => {
                return err.response
            });
            return result
        }
        return "L'email n'est pas conforme."
    }

    const register = (API_URL, email, firstname, lastname, password, pass2) => {
        if(password !== pass2)
            return {error: "Les mots de passe ne correspondent pas"}
        if(lastname.length < 2 || firstname < 2) 
            return {error: "Le prénom ou le nom est trop court"}
        if(!isEmail(email)) {
            const result = axios.post(API_URL + "/users/create", { email, firstname, lastname, password })
            .then(res => {
                return res.data
            })
            .catch(err => {
                return err.response.data
            });
            return result;
        }
        return "Une erreur est survenue."
    }
    
    const getAverageGoal = async () => {
        const result = await httpClient.get('/team/average_team').then(res => {
              res.data.data.sort((a, b) => b.moyenne_goal - a.moyenne_goal);
              return res.data.data
          })
        .catch(err => {
          return err.response
        });
        return result
    }

  module.exports = {
      login, 
      register,
      getAverageGoal,
      getAllTeam: async function(API_URL) {
        const result = await axios.get(
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
          return err.response
        });
        return result
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
        const result = await axios.post(
            API_URL + `/match`,
            bodyFormData, { headers: headers })
          .then(res => {
            return res
          })
          .catch(err => {
           return err.response
          });
        return result
      },
      createTeam: async function(API_URL, teamName, arrayTeam) {
        const result = await axios.post(
          API_URL + `/team/create_team`,
          [{name: teamName, player: arrayTeam }])
        .then(res => {
          return res
        })
        .catch(err => {
          return err.response
        });
        return result
      },
      matchListHistoric: async function(API_URL) {
        const result = await axios.get(
          API_URL + `/match/all_match`).then(res => {
            return res.data.data
          })
        .catch(err => {
          return err.response
        });
        return result
      },
      updateProfil: async function(API_URL, idUser, description, post) {
        const result = await axios.put(
          API_URL + `/users/${idUser}`,
          { description, post})
        .then(res => {
            return res
        })
        .catch(err => {
          return err.response
        });
        return result
      },
      getTeam: async function(API_URL) {
        const result = await axios.get(
          API_URL + `/team/all_team`)
          .then(res => {
              return res.data.data
          })  
          .catch(err => {
            return err.response
          });
        return result
      },
      getMyTeam: async function(API_URL, teamID, userID) {
        let teamUrl = []
        teamID && teamID.map((elm) => teamUrl.push(API_URL + `/team/${elm.value}`))
        return teamUrl
      },
      verification: async function(API_URL, otp, token, idUser) {
        const result = await axios.get(
          API_URL + `/users/verification_code/${otp.toUpperCase()}`,
          {
              headers: {
              "api-token": token
              }
          })
          .then(async (res) => {
              return res
          })
          .catch(err => {
              return err.response
          });
        return result
      },
      getUserInfo: async function(API_URL, idUser) {
        const result = await axios.get(API_URL + `/users/${idUser}`)
        .then(async (res) => {
          return res
        })
        .catch(err => {
          return err.response
        });
        return result
      }
  }

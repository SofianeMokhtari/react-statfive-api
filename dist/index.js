'use strict';

var _axiosConfig = require('./axiosConfig');

var _asyncStorage = require('@react-native-async-storage/async-storage');

var _asyncStorage2 = _interopRequireDefault(_asyncStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');


var isEmail = function isEmail(val) {
  var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    return true;
  }
};

var login = function login(API_URL, email, password) {
  if (!isEmail(email)) {
    var result = axios.post(API_URL + "/users/login", { email: email, password: password }).then(function (res) {
      _asyncStorage2.default.setItem('token', res.data.data.token);
      return res.data;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  }
  return "L'email n'est pas conforme.";
};

var register = function register(API_URL, email, firstname, lastname, password, pass2) {
  if (password !== pass2) return { error: "Les mots de passe ne correspondent pas" };
  if (lastname.length < 2 || firstname < 2) return { error: "Le prénom ou le nom est trop court" };
  if (!isEmail(email)) {
    var result = axios.post(API_URL + "/users/create", { email: email, firstname: firstname, lastname: lastname, password: password }).then(function (res) {
      return res.data;
    }).catch(function (err) {
      return err.response.data;
    });
    return result;
  }
  return "Une erreur est survenue.";
};

var getAverageGoal = async function getAverageGoal() {
  var result = await _axiosConfig.httpClient.get('/team/average_team').then(function (res) {
    res.data.data.sort(function (a, b) {
      return b.moyenne_goal - a.moyenne_goal;
    });
    return res.data.data;
  }).catch(function (err) {
    return err.response;
  });
  return result;
};

module.exports = {
  login: login,
  register: register,
  getAverageGoal: getAverageGoal,
  getAllTeam: async function getAllTeam(API_URL) {
    var result = await axios.get(API_URL + '/team/all_team').then(function (res) {
      var arrayObj = res.data.data;
      arrayObj = arrayObj.map(function (item) {
        return {
          value: item.id,
          label: item.name
        };
      });
      return arrayObj;
    }).catch(function (err) {
      console.log(err);
      return err.response;
    });
    return result;
  },
  addVideo: async function addVideo(API_URL, mp4, teamOne, teamTwo, token) {
    var bodyFormData = new FormData();
    bodyFormData.append('video', mp4);
    bodyFormData.append('team_one', teamOne);
    bodyFormData.append('team_two', teamTwo);

    var headers = {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      'api-token': token
    };
    var result = await axios.post(API_URL + '/match', bodyFormData, { headers: headers }).then(function (res) {
      return res;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  createTeam: async function createTeam(API_URL, teamName, arrayTeam) {
    var result = await axios.post(API_URL + '/team/create_team', [{ name: teamName, player: arrayTeam }]).then(function (res) {
      return res;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  matchListHistoric: async function matchListHistoric(API_URL) {
    var result = await axios.get(API_URL + '/match/all_match').then(function (res) {
      return res.data.data;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  updateProfil: async function updateProfil(API_URL, idUser, description, post) {
    var result = await axios.put(API_URL + ('/users/' + idUser), { description: description, post: post }).then(function (res) {
      return res;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  getTeam: async function getTeam(API_URL) {
    var result = await axios.get(API_URL + '/team/all_team').then(function (res) {
      return res.data.data;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  getMyTeam: async function getMyTeam(API_URL, teamID, userID) {
    var teamUrl = [];
    teamID && teamID.map(function (elm) {
      return teamUrl.push(API_URL + ('/team/' + elm.value));
    });
    return teamUrl;
  },
  verification: async function verification(API_URL, otp, token, idUser) {
    var result = await axios.get(API_URL + ('/users/verification_code/' + otp.toUpperCase()), {
      headers: {
        "api-token": token
      }
    }).then(async function (res) {
      return res;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  },
  getUserInfo: async function getUserInfo(API_URL, idUser) {
    var result = await axios.get(API_URL + ('/users/' + idUser)).then(async function (res) {
      return res;
    }).catch(function (err) {
      return err.response;
    });
    return result;
  }
};
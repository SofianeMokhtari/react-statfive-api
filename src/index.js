const axios = require("axios");
import { httpClient } from "./axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmail = (val) => {
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    return true;
  }
};

const login = (API_URL, email, password) => {
  if (!isEmail(email)) {
    const result = axios
      .post(API_URL + "/users/login", { email, password })
      .then(async (res) => {
        await AsyncStorage.setItem("token", res.data.data.token);
        await AsyncStorage.setItem("userInfo", JSON.stringify(res.data.data));
        return res.data;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  }
  return "L'email n'est pas conforme.";
};

const register = (API_URL, email, firstname, lastname, password, pass2) => {
  if (password !== pass2)
    return { error: "Les mots de passe ne correspondent pas" };
  if (lastname.length < 2 || firstname < 2)
    return { error: "Le prénom ou le nom est trop court" };
  if (!isEmail(email)) {
    const result = axios
      .post(API_URL + "/users/create", { email, firstname, lastname, password })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return result;
  }
  return "Une erreur est survenue.";
};

const getAverageGoal = async () => {
  const result = await httpClient
    .get("/team/average_team")
    .then((res) => {
      return res.data.data.sort((a, b) => b.moyenne_goal - a.moyenne_goal);
      //return res.data.data
    })
    .catch((err) => {
      return err.response;
    });
  return result;
};

module.exports = {
  login,
  register,
  getAverageGoal,
  getAllTeam: async function () {
    const result = await httpClient
      .get(`/team/all_team`)
      .then((res) => {
        let arrayObj = res.data.data;
        arrayObj = arrayObj.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        return arrayObj;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
    return result;
  },
  addVideo: async function (mp4, teamOne, teamTwo) {
    var bodyFormData = new FormData();
    bodyFormData.append("video", mp4);
    bodyFormData.append("team_one", teamOne);
    bodyFormData.append("team_two", teamTwo);

    var headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    const result = await httpClient
      .post(`/match`, bodyFormData, { headers: headers })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  createTeam: async function (teamName, arrayTeam) {
    const result = await httpClient
      .post(`/team/create_team`, [{ name: teamName, player: arrayTeam }])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  matchListHistoric: async function () {
    const result = await httpClient
      .get(`/match/all_match`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  updateProfil: async function (idUser, description, post) {
    const result = await httpClient
      .put(`/users/${idUser}`, { description, post })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  getTeam: async function () {
    const result = await httpClient
      .get(`/team/all_team`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  getMyTeam: async function () {
    const result = await httpClient
      .get(`/team`)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  verification: async function (otp) {
    const result = await httpClient
      .get(`/users/verification_code/${otp.toUpperCase()}`)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  getUserInfo: async function (idUser) {
    const result = await httpClient
      .get(`/users/${idUser}`)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  statMatchById: async function (idMatch) {
    const result = await httpClient
      .get(`/match/stat_match_by_id/${idMatch}`)
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  getAllUser: async function () {
    const result = await httpClient
      .get(`/users/all_user`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return result;
  },
  getNewPassword: async function (mail) {
    const result = await httpClient
      .post('/users/mail-reset-password', {"email": mail})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response
      });
    return result
  },
  changeMyPassword: async function (code, password) {
    const result = await httpClient
      .post('/users/confirm-reset-password', {code, password})
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response
      });
    return result
  },
  getMe: async function() {
    const result = await httpClient.get('/users/me').then((res) => {
      return res;
    }).catch((err) => {
      return err.response
    })
    return result
  }
};

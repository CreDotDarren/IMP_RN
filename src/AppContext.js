import React from 'react';
import {Modal, ActivityIndicator, View, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
const secretKey = '86uhaGpXwaBI9N9Q9z53hFYrslB0gtis';
let myToken = '';

axios.defaults.baseURL = 'https://www.gdim.tw/MP_Authentication.svc';
// axios.defaults.baseURL = "https://www.guanda.tw/MP_Authentication.svc";

/////////////////////////////////////////////////////

const AppContext = React.createContext();

const requestPost = axios.create({
  baseURL: `https://www.gdim.tw/Photo.svc`,
  // baseURL: `https://www.guanda.tw/Photo.svc`,

  headers: {
    'Content-Type': 'application/json',
  },
});

let credotRequest = axios.create({
  baseURL: `http://172.20.10.3:8084`,
  timeout: 10000,
});

let credotV2Request = axios.create({
  baseURL: ``,
  timeout: 10000,
});

const AppProvider = ({children}) => {
  React.useEffect(() => {}, []);
  const accessTokenString = 'access-token';

  const [modal, setModal] = React.useState(null);

  const [company, setCompany] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userCamera, setUserCamera] = React.useState(false);
  const [userMap, setUserMap] = React.useState(false);
  const [userMonitor, setUserMonitor] = React.useState(false);
  const [userSticker, setUserSticker] = React.useState(false);
  const [userBox, setUserBox] = React.useState(false);
  const [userBH, setUserBH] = React.useState(false);
  const [userShipment, setUserShipment] = React.useState(false);
  const [userWeight, setUserWeight] = React.useState(false);

  const [matchMaterialData, setMatchMaterialData] = React.useState([]);

  const [socketOpenOilStatus, setSocketOpenOilStatus] =
    React.useState(undefined);
  const [monitorMecChanged, setMonitorMecChanged] = React.useState({
    BootTime: 0,
    CutOil: false,
    DrillLeft: 0,
    DrillMiddle: 0,
    DrillRight: 0,
    FinishKg: 0,
    FinishNumber: 0,
    HydraulicOil: false,
    LubricantOil: false,
  });
  const [sOperatingState, setSOperatingState] = React.useState(false);
  const [threeAxisState, setThreeAxisState] = React.useState(undefined);

  const setV2CreDotUrl = company => {
    console.log(`⭐⭐⭐ 目前登入公司：${company} `);

    if (company == 'LS') {
      credotV2Request = axios.create({
        baseURL: `https://guanda-fuc-system-be.caprover.credot-web.com/`,
        timeout: 10000,
      });
    }
  };

  const startAuth = async () => {
    const accessTokenString = 'Access-Token';
    // get seed
    const seedIdResult = await credotFetchApiPost(`/auth/seed`, {
      uid: account,
    });
    console.log(`seedIdResult:--------${JSON.stringify(seedIdResult)}`);
    const seedId = seedIdResult['seedId'];
    console.log('Seed-Id: ', seedId);
    console.log(seedId + secretKey);
    const seed = CryptoJS.SHA256(seedId + secretKey).toString();
    console.log('Seed: ', seed);

    // get token
    const tokenResult = await credotFetchApiPost(`/auth/token`, {
      seed: seed,
    });
    return tokenResult.length == 0 ? true : false;
  };

  const credotFetchApiPost = async (path, params) => {
    console.log(`🌷🌷🌷 Url: ${credotRequest.defaults.baseURL}${path}`);
    console.log(`💧💧💧 Body: ${JSON.stringify(params)}`);
    console.log(`💧💧💧 Authorization: Bearer ${myToken}`);

    try {
      setModal(1);
      const response = await credotRequest.post(path, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      console.log(response.headers[accessTokenString]);
      myToken = response.headers[accessTokenString];
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 statusCode: ${error.response.status}`);
      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }

      return error;
    }
    setModal(null);

    return data;
  };

  const credotV2FetchApiPost = async (path, params) => {
    console.log(`🌷🌷🌷 Url: ${credotV2Request.defaults.baseURL}${path}`);
    console.log(`💧💧💧 Body: ${JSON.stringify(params)}`);
    console.log(`💧💧💧 Authorization: Bearer ${myToken}`);

    try {
      setModal(1);
      const response = await credotV2Request.post(path, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      const responseData = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(responseData)}`);
      if (responseData['token'] != undefined) {
        myToken = responseData['token'];
      }
      setModal(null);
      return responseData;
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 statusCode: ${error.response.status}`);
      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else {
        Alert.alert('系統提醒', `${error}`, [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }
    }
  };

  const credotV2FetchApiGet = async path => {
    let data = null;

    console.log(`🌷🌷🌷 Url: ${credotV2Request.defaults.baseURL}${path}`);
    console.log(`💧💧💧 Authorization: Bearer ${myToken}`);
    try {
      setModal(1);

      const response = await credotV2Request.get(path, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      if (response['token'] != undefined) {
        myToken = response['token'];
      }
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else {
        Alert.alert('系統提醒', `${error}`, [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }
    }
    setModal(null);

    return data;
  };

  const credotFetchApiPostNoLoading = async (path, params) => {
    console.log(`🌷🌷🌷 Url: ${credotRequest.defaults.baseURL}${path}`);
    console.log(`💧💧💧 Body: ${JSON.stringify(params)}`);
    console.log(`💧💧💧 Authorization: Bearer ${myToken}`);

    try {
      const response = await credotRequest.post(path, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      console.log(response.headers[accessTokenString]);
      myToken = response.headers[accessTokenString];
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 statusCode: ${error.response.status}`);
      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }

      return error;
    }
    setModal(null);

    return data;
  };

  const credotFetchApiGet = async path => {
    let data = null;

    console.log(`🌷🌷🌷 Url: ${credotRequest.defaults.baseURL}${path}`);

    try {
      setModal(1);

      const response = await credotRequest.get(path, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      console.log(response.headers[accessTokenString]);
      myToken = response.headers[accessTokenString];
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }
      return error;
    }
    setModal(null);

    return data;
  };

  const credotFetchApiGetNoLoading = async path => {
    let data = null;

    console.log(`🌷🌷🌷 Url: ${credotRequest.defaults.baseURL}${path}`);

    try {
      const response = await credotRequest.get(path, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${myToken}`,
        },
      });
      console.log(response.headers[accessTokenString]);
      myToken = response.headers[accessTokenString];
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log(`🚫🚫🚫 error: ${error}`);
      if (error.response.status == 401) {
        Alert.alert('系統提醒', '無法驗證身份。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      } else if (error.response.status == 403) {
        Alert.alert('系統提醒', '無法驗證身份，請先取得操作機台權限。', [
          {
            text: '確認',
            onPress: () => {},
          },
        ]);
      }
      return error;
    }
    setModal(null);

    return data;
  };

  const fetchApiPost = async (path, params) => {
    console.log(`🌷🌷🌷 Url: ${requestPost.defaults.baseURL}/${path}`);
    console.log(`💧💧💧 Body: ${JSON.stringify(params)}`);
    try {
      setModal(1);

      const response = await requestPost.post(path, params);
      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 error: ${JSON.stringify(error)}`);
      return error;
    }
    setModal(null);

    return data;
  };

  const fetchApi = async (api, param) => {
    let data = null;

    console.log(`🌷🌷🌷 Url: ${axios.defaults.baseURL}/${api}`);

    try {
      setModal(1);

      const response = await axios.get(api, param);

      data = response.data;
      console.log(`🍀🍀🍀 Response: ${JSON.stringify(data)}`);
      setModal(null);
    } catch (error) {
      setModal(null);

      console.log(`🚫🚫🚫 error: ${JSON.stringify(error)}`);
      return error;
    }
    setModal(null);

    return data;
  };

  return (
    <AppContext.Provider
      value={{
        setV2CreDotUrl,
        fetchApi,
        fetchApiPost,
        startAuth,
        credotFetchApiPost,
        credotV2FetchApiPost,
        credotV2FetchApiGet,
        credotFetchApiPostNoLoading,
        credotFetchApiGet,
        credotFetchApiGetNoLoading,
        setModal,

        setCompany,
        setAccount,
        setPassword,
        setUserCamera,
        setUserMap,
        setUserMonitor,
        setUserSticker,
        setUserBox,
        setUserBH,
        setUserShipment,
        setUserWeight,
        setMatchMaterialData,

        setSOperatingState,
        sOperatingState,
        setSocketOpenOilStatus,
        socketOpenOilStatus,
        setThreeAxisState,
        threeAxisState,
        monitorMecChanged,

        account,
        password,
        userCamera,
        company,
        userMap,
        userMonitor,
        userSticker,
        userBox,
        userBH,
        userShipment,
        userWeight,
        matchMaterialData,
        myToken,
        setApiUrl: url => {
          credotRequest = axios.create({
            baseURL: `http://${url}`,
            timeout: 10000,
          });
        },
      }}>
      {/* modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal !== null}
        onRequestClose={() => {
          setModal(null);
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(100,100,100,0.7)',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 30,
              borderRadius: 15,
            }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      </Modal>

      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};

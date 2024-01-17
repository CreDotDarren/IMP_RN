import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {AppContext} from '../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}) => {
  const appCtx = React.useContext(AppContext);

  const window = useWindowDimensions();

  const [company, setCompany] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [learnStatus, setLearnStatus] = React.useState(false);

  const [companyStatus, setCompanyStatus] = React.useState(false);
  const [accountStatus, setAccountStatus] = React.useState(false);
  const [passwordStatus, setPasswordStatus] = React.useState(false);

  const gfAccountPassword = [
    {code: 'gf', account: 'gf001', password: 'gf001gf'},
    {code: 'gf', account: 'gf002', password: 'gf002gf'},
    {code: 'gf', account: 'gf003', password: 'gf003gf'},
    {code: 'gf', account: 'gf004', password: 'gf004gf'},
    {code: 'gf', account: 'gf005', password: 'gf005gf'},
    {code: 'gf', account: 'gf006', password: 'gf006gf'},
    {code: 'gf', account: 'gf007', password: 'gf007gf'},
    {code: 'gf', account: 'gf008', password: 'gf008gf'},
    {code: 'gf', account: 'gf009', password: 'gf009gf'},
    {code: 'gf', account: 'gf0010', password: 'gf0010gf'},
  ];

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      readData();
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const readData = async () => {
    const _company = await AsyncStorage.getItem('Company');
    const _account = await AsyncStorage.getItem('Account');
    const _password = await AsyncStorage.getItem('Password');

    setCompany(_company == null ? '' : _company);
    setAccount(_account == null ? '' : _account);
    setPassword(_password == null ? '' : _password);

    console.log(`⭐⭐⭐ 公司：${_company}`);
    console.log(`⭐⭐⭐ 帳號：${_account}`);
    console.log(`⭐⭐⭐ 密碼：${_password}`);

    if (_account == null && _password == null) {
      setLearnStatus(false);
    } else if (_account == '' && _password == '') {
      setLearnStatus(false);
    } else {
      setLearnStatus(true);
    }
  };
  const startLogin = async (company, account, password) => {
    let gfStats = false;
    appCtx.setV2CreDotUrl(company);

    console.log(`🤪目前登入員工帳號：${account}`);
    console.log(`🤪目前登入員工密碼：${password}`);
    for (var index in gfAccountPassword) {
      if (
        gfAccountPassword[index]['account'] == account &&
        gfAccountPassword[index]['password'] == password
      ) {
        gfStats = false;
        break;
      } else {
        gfStats = true;
      }
    }
    console.log(gfStats);

    if (gfStats) {
      console.log(`23456`);

      const data = await appCtx.credotV2FetchApiPost(`/app/auth/login`, {
        account: account,
        password: password,
      });
      console.log(data);
      if (data != undefined) {
        appCtx.setCompany(company);
        appCtx.setAccount(account);
        appCtx.setPassword(password);

        if (learnStatus) {
          await AsyncStorage.setItem('Company', company);
          await AsyncStorage.setItem('Account', account);
          await AsyncStorage.setItem('Password', password);
        } else {
          await AsyncStorage.setItem('Company', '');
          await AsyncStorage.setItem('Account', '');
          await AsyncStorage.setItem('Password', '');
        }
        navigation.navigate('Home', {
          gfStats: gfStats,
        });
      }
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={require('../assets/img_bg_01.png')}
            style={{width: window.width, height: window.height}}>
            <SafeAreaView style={{flex: 1}}>
              <Image
                source={require('../assets/img_bg_big_logo.png')}
                style={{alignSelf: 'center', width: window.width}}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 30,
                  justifyContent: 'center',
                  marginBottom: 150,
                }}>
                <View style={styles.contentBgView}>
                  <View style={styles.triangleBgView}>
                    <Image
                      style={styles.triangleImg}
                      source={require('../assets/img_triangle.png')}
                    />
                  </View>
                  <Text style={styles.title}>公司</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="rgb(78,80,85)"
                    placeholder="請輸入代號"
                    value={company.toString()}
                    onChangeText={text => {
                      setCompanyStatus(text.length == 0);
                      setCompany(`${text}`);
                    }}
                    secureTextEntry={false}></TextInput>
                  <View
                    style={{
                      position: 'absolute',
                      marginBottom: 0,
                      height: 1,
                      flex: 1,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
                <View style={styles.line}></View>
                {companyStatus ? (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-end',
                      fontSize: 15,
                    }}>
                    公司格式錯誤
                  </Text>
                ) : (
                  <View style={{padding: 8}} />
                )}

                <View style={styles.contentBgView}>
                  <View style={styles.triangleBgView}>
                    <Image
                      style={styles.triangleImg}
                      source={require('../assets/img_triangle.png')}
                    />
                  </View>
                  <Text style={styles.title}>帳號</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="rgb(78,80,85)"
                    placeholder="請輸入帳號"
                    value={account.toString()}
                    onChangeText={text => {
                      setAccountStatus(text.length == 0);
                      setAccount(`${text}`);
                    }}
                    secureTextEntry={false}></TextInput>
                  <View
                    style={{
                      position: 'absolute',
                      marginBottom: 0,
                      height: 1,
                      flex: 1,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
                <View style={styles.line}></View>
                {accountStatus ? (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-end',
                      fontSize: 15,
                    }}>
                    帳號格式錯誤
                  </Text>
                ) : (
                  <View style={{padding: 8}} />
                )}

                <View style={styles.contentBgView}>
                  <View style={styles.triangleBgView}>
                    <Image
                      style={styles.triangleImg}
                      source={require('../assets/img_triangle.png')}
                    />
                  </View>
                  <Text style={styles.title}>密碼</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="rgb(78,80,85)"
                    placeholder="請輸入密碼"
                    value={password.toString()}
                    onChangeText={text => {
                      setPasswordStatus(text.length == 0);
                      setPassword(`${text}`);
                    }}
                    secureTextEntry={true}></TextInput>
                  <View
                    style={{
                      position: 'absolute',
                      marginBottom: 0,
                      height: 1,
                      flex: 1,
                      backgroundColor: 'white',
                    }}
                  />
                </View>
                <View style={styles.line}></View>
                {passwordStatus ? (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-end',
                      fontSize: 15,
                    }}>
                    密碼格式錯誤
                  </Text>
                ) : (
                  <View style={{padding: 8}} />
                )}

                <View style={styles.contentBgView}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => setLearnStatus(!learnStatus)}>
                    <Image
                      source={
                        learnStatus
                          ? require('../assets/btn_checkbox_pressed.png')
                          : require('../assets/btn_checkbox_normal.png')
                      }
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      paddingLeft: 10,
                    }}>
                    記住帳號密碼
                  </Text>
                </View>
              </View>

              <View style={{height: 70, paddingVertical: 10, marginBottom: 20}}>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (
                      company.length != 0 &&
                      account.length != 0 &&
                      password.length != 0
                    ) {
                      startLogin(company, account, password);
                    }
                    setCompanyStatus(company.length == 0);
                    setAccountStatus(account.length == 0);
                    setPasswordStatus(password.length == 0);
                  }}>
                  <Image
                    style={{width: window.width}}
                    source={require('../assets/btn_singin_regular.png')}
                  />

                  <Text
                    style={{
                      position: 'absolute',
                      color: 'white',
                      fontSize: 25,
                    }}>
                    登入
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  marginBottom: 5,
                  fontSize: 15,
                }}>
                {`IMS_1.0.0_1.0.0`}
              </Text>
            </SafeAreaView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contentBgView: {
    flexDirection: 'row',
  },

  triangleBgView: {
    width: 14,
    justifyContent: 'flex-end',
  },

  triangleImg: {
    height: 14,
    width: 14,
    marginLeft: 0,
    marginBottom: 0,
  },

  title: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },

  input: {
    marginLeft: 16,
    flex: 1,
    fontSize: 22,
    color: 'white',
  },
  line: {
    height: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

export {LoginPage};

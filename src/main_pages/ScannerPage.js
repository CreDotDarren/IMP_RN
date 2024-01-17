import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppBar} from '../components/AppBar';
import {BackButton} from '../components/BackButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import SwipeView from 'react-native-swipeview';
import {StickersItem} from '../components/StickersItem';
import {AppContext} from '../AppContext';
import {Menu} from 'react-native-paper';

let sacnnerSet = new Set();

const ScannerPage = ({navigation, route}) => {
  const [flashlightStatus, setflashlightStatus] = React.useState(false);
  const [scannerData, setScannerData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [dataArray, setDataArray] = React.useState([]);
  const [customers, setCustomers] = React.useState('');
  const [customerId, setCustomerId] = React.useState('');

  const appCtx = React.useContext(AppContext);

  const listRef = React.useRef(null);

  const [openCamera, setOpenCamera] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    startGetWaitStart();

    return () => {
      console.log('離開ScannerPage');
      sacnnerSet = new Set();
      unsubscribe();
    };
  }, []);
  const startGetWaitStart = async () => {
    setDataArray([]);
    const data = await appCtx.credotV2FetchApiGet(`app/customers`);
    setDataArray(data.data);
  };
  const mechanicalMachiningParsing = mechanicalStickers => {
    const dataDictionary = {};

    //57895146201,VA325,CNS 13812 SN400YB,H250X125X6/9,12000
    //CNS 13812 SN400YB H250x 125x 6.0x 9.0 11.0m H85222 TUNG HO STEEL MIAOLI WORKS TAIWAN 67673 2001112B
    //CNS 13812 SN400YB H488x300x11.0x18.0 11.0m H82542 TUNG HO STEEL MIAOLI WORKS TAIWAN 65861 1907163A
    //CNS 13812 SN400YB H250x125x 6.0x 9.0 11.0m H85222 TUNG HO STEEL MIAOLI WORKS TAIWAN 67673 2001112B

    // 18.0 11.0m H82542 TUNG HO STEEL MIAOLI WORKS TAIWAN 65861 1907163A
    //  9.0 11.0m H85222 TUNG HO STEEL MIAOLI WORKS TAIWAN 67673 2001112B

    //ASTM A36 CB200x80x7.5x11 10.0m K90996 TUNG HO STEEL KAOHSIUNG WORKS TAIWAN 23483$$04566
    //ASTM A36 CB200x80x7.5x11 9.0m K90996 TUNG HO STEEL KAOHSIUNG WORKS TAIWAN 23483$$04776
    //ASTM A36 CB200x80x7.5x11 10.0m K90996 TUNG HO STEEL KAOHSIUNG WORKS TAIWAN 23483$$04566
    if (mechanicalStickers.trim().split(' ').length == 12) {
      const datas = mechanicalStickers.trim().split(' ');
      dataDictionary.MechanicalCompany = '東和';

      dataDictionary.Length = datas[3];
      dataDictionary.MechanicalLuhao = datas[4];
      dataDictionary.Specification = datas[2];
      dataDictionary.MechanicalMaterial = `${datas[0]} ${datas[1]}`;
      dataDictionary.MechanicalID = datas[datas.length - 1];
    } else {
      if (mechanicalStickers.split('x').length == 4) {
        const datas = mechanicalStickers.split('x');

        const aaa = ` ${datas[datas.length - 1].trim()}`;
        const lastArray = aaa.split(' ');
        console.log(`------------${lastArray[lastArray.length - 1]}`);

        if (lastArray[lastArray.length - 2] == 'TAIWAN') {
          dataDictionary.MechanicalID = lastArray[lastArray.length - 1];
          const firstS = datas[0] ?? '';
          const firstArray = firstS.split(' ').filter(str => str != '');

          dataDictionary.Specification = `${
            firstArray[firstArray.length - 1]
          }x${datas[1]}x${datas[2]}x${lastArray[1]}`;

          dataDictionary.Length = lastArray[2];
          dataDictionary.MechanicalCompany = '東和';
          dataDictionary.MechanicalMaterial = `${firstArray[0]} ${firstArray[1]} ${firstArray[2]}`;
          dataDictionary.MechanicalLuhao = lastArray[3];
        } else {
          if (lastArray[1] == '') {
            dataDictionary.MechanicalID = `${lastArray[lastArray.length - 2]}${
              lastArray[lastArray.length - 1]
            }`;

            const firstS = datas[0] ?? '';
            const firstArray = firstS.split(' ');
            dataDictionary.Specification = `${
              firstArray[firstArray.length - 1]
            }x${datas[1]}x${datas[2]}x${lastArray[2]}`;

            dataDictionary.Length = lastArray[3];
            dataDictionary.MechanicalCompany = '東和';
            dataDictionary.MechanicalMaterial = `${firstArray[0]} ${firstArray[1]} ${firstArray[2]}`;
            dataDictionary.MechanicalLuhao = lastArray[4];
          } else {
            dataDictionary.MechanicalID = `${lastArray[lastArray.length - 2]}${
              lastArray[lastArray.length - 1]
            }`;

            const firstS = datas[0] ?? '';
            const firstArray = firstS.split(' ');
            dataDictionary.Specification = `${
              firstArray[firstArray.length - 1]
            }x${datas[1]}x${datas[2]}x${lastArray[1]}`;

            dataDictionary.Length = lastArray[2];
            dataDictionary.MechanicalCompany = '東和';
            dataDictionary.MechanicalMaterial = `${firstArray[0]} ${firstArray[1]} ${firstArray[2]}`;
            dataDictionary.MechanicalLuhao = lastArray[3];
          }
        }
      } else {
        const datas = mechanicalStickers.split(',');
        if (datas[0] == 'GUANDA') {
          dataDictionary.MechanicalID = datas[1];
          dataDictionary.Specification = datas[datas.length - 3];
          const lengthM = parseInt(datas[datas.length - 2]) ?? 0;
          dataDictionary.Length = `${Math.floor((lengthM / 1000) * 10) / 10}`;
          dataDictionary.MechanicalCompany = datas[datas.length - 1];
          dataDictionary.MechanicalMaterial = datas[3];
          dataDictionary.MechanicalLuhao = datas[2];
        } else {
          dataDictionary.MechanicalID = datas[0];
          dataDictionary.Specification = datas[datas.length - 2];
          const lengthM = parseInt(datas[datas.length - 1]) ?? 0;
          dataDictionary.Length = `${Math.floor((lengthM / 1000) * 10) / 10}`;
          dataDictionary.MechanicalCompany = '中龍';
          dataDictionary.MechanicalMaterial = datas[2];
          dataDictionary.MechanicalLuhao = datas[1];
        }
      }
    }
    console.log(dataDictionary);
    setScannerData(data => {
      return [dataDictionary, ...data];
    });
  };

  const deleteItem = item => {
    console.log(`!!!!!!!!!!!!!!!!!!!${JSON.stringify(item)}`);

    let _index;
    for (var index in scannerData) {
      if (scannerData[index]['MechanicalID'] == item) {
        _index = index;
      }
    }

    sacnnerSet.delete(scannerData[_index]);

    setScannerData(scannerData.filter((item, index) => index != _index));
  };
  const Anchor = ({onPress, title, show, setTitle}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize: 20, color: show ? '#787A7F' : 'white'}}>
        {show ? title : setTitle}
      </Text>
    </TouchableOpacity>
  );
  const warehouseConsumeApi = async () => {
    console.log(scannerData);
    console.log(scannerData.map(json => json['Specification']).join(','));

    let sendArray = [];
    for (let index = 0; index < scannerData.length; index++) {
      sendArray.push({
        labelId: scannerData[index]['MechanicalID'],
        specification: scannerData[index]['Specification'],
        material: scannerData[index]['MechanicalMaterial'],
        length: scannerData[index]['Length'],
        supplier:
          scannerData[index]['MechanicalCompany'] == '中龍'
            ? 'DRAGON_STEEL'
            : 'TUNGHO_STEEL',
        furnaceNumber: scannerData[index]['MechanicalLuhao'],
      });
    }

    const data = await appCtx.credotV2FetchApiPost(`app/warehouse/consume`, {
      consumes: sendArray,
      customerId: customerId,
    });
    Alert.alert(`Server回傳訊息`, `已成功送出`, [
      {
        text: '確定',
        onPress: () => {
          sacnnerSet = new Set();
          setScannerData([]);
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#37393e', '#060914']}
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <AppBar
          title={`掃描-出貨素材貼紙`}
          left={
            <BackButton
              onPress={() => {
                navigation.pop();
              }}
            />
          }
          right={
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                Alert.alert(`送出提醒`, `請確認資料無誤`, [
                  {
                    text: '取消',
                    onPress: () => {},
                  },
                  {
                    text: '確定',
                    onPress: () => {
                      if (scannerData.length == 0) {
                      } else {
                        warehouseConsumeApi();
                      }
                    },
                  },
                ]);
              }}>
              <Image source={require('../assets/btn_upload.png')} />
            </TouchableOpacity>
          }
        />
        <View style={{height: 1, backgroundColor: 'white', marginBottom: 10}} />
        <View
          style={{
            marginHorizontal: 10,
            // flex: 1,
            height: 70,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{marginLeft: 10, flex: 1}}>
              <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Anchor
                    title="請選擇客戶"
                    onPress={() => setVisible(true)}
                    show={customers.length == 0}
                    setTitle={customers}
                  />
                }>
                {dataArray &&
                  dataArray.map((e, index) => (
                    <Menu.Item
                      key={e.name}
                      title={e.name}
                      onPress={() => {
                        console.log(
                          `e-------------------${e.name}、${index}、${e.id}`,
                        );
                        setCustomers(e.name);
                        setVisible(false);
                        setCustomerId(e.id);
                      }}
                    />
                  ))}
              </Menu>
              <View
                style={{
                  height: 2,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            // height: 400,
            flex: 1,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <QRCodeScanner
            reactivate={openCamera}
            onRead={e => {
              let scannerString = e.data;
              console.log(`掃描到的資料：${scannerString}`);
              console.log(`-----------------------------`);

              console.log(sacnnerSet);
              if (!sacnnerSet.has(scannerString)) {
                sacnnerSet.add(scannerString);

                if (
                  `${scannerString}`.split('').filter(item => item === 'x')
                    .length >= 3 ||
                  `${scannerString}`.split('').filter(item => item === 'X')
                    .length >= 2
                ) {
                  mechanicalMachiningParsing(scannerString);
                }
              }
            }}
            flashMode={
              flashlightStatus
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              position: 'absolute',
              backgroundColor: '#37393e',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              setflashlightStatus(flashlightStatus == true ? false : true);
            }}>
            <Text style={{color: 'white'}}>
              {flashlightStatus ? `開啟手電筒` : `關閉手電筒`}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', marginHorizontal: 10, fontSize: 16}}>
          {`掃描數量：${scannerData.length} 支`}
        </Text>
        <FlatList
          ref={listRef}
          // style={{flex: 1}}
          data={scannerData}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View>
                <View
                  style={{
                    height: 10,
                    backgroundColor: 'rgba(52, 52, 52, 0)',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#494A4E',
                  }}>
                  <SwipeView
                    onSwipedLeft={() => {
                      Alert.alert(`是否確定刪除？`, null, [
                        {
                          text: '取消',
                          onPress: () => {},
                        },
                        {
                          text: '確定',
                          onPress: () => {
                            deleteItem(item.MechanicalID);
                          },
                        },
                      ]);
                    }}
                    disableSwipeToRight={true}
                    renderVisibleContent={() => (
                      <StickersItem
                        _id={item.MechanicalID}
                        mechanicalCompany={item.MechanicalCompany}
                        specification={item.Specification}
                        length={item.Length}
                      />
                    )}
                    renderRightView={() => (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}></View>
                    )}
                  />
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export {ScannerPage};

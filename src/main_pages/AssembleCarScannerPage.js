import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppBar} from '../components/AppBar';
import {BackButton} from '../components/BackButton';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {AppContext} from '../AppContext';

const AssembleCarScannerPage = ({navigation, route}) => {
  const [flashlightStatus, setflashlightStatus] = React.useState(false);
  const [scannerStatus, setScannerStatus] = React.useState(true);
  const [loadingNumber, setLoadingNumber] = React.useState('');
  const appCtx = React.useContext(AppContext);

  const startLoadingNumber = async () => {
    setScannerStatus(false);
    const data = await appCtx.credotV2FetchApiPost(
      `app/warehouse/stock-material`,
      {
        loadingNumber: loadingNumber,
        warehouseSubLocationId: route.params.shippedLastId,
      },
    );
    setScannerStatus(true);

    Alert.alert(`Server回傳訊息`, `已成功送出`, [
      {
        text: '確定',
        onPress: () => {
          navigation.pop();
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
          title={`掃描-裝車單號`}
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
                      startLoadingNumber();
                    },
                  },
                ]);
              }}>
              <Image source={require('../assets/btn_upload.png')} />
            </TouchableOpacity>
          }
        />

        <View
          style={{
            height: '50%',
            overflow: 'hidden',
          }}>
          <QRCodeScanner
            reactivate={scannerStatus}
            onRead={e => {
              console.log(`掃描到的資料：${e.data}`);
              setLoadingNumber(e.data);
            }}
            flashMode={
              flashlightStatus
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
          />
          <TouchableOpacity
            style={{
              // alignSelf: 'flex-end',
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
        <View style={{marginHorizontal: 10, height: '30%'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>{`倉庫位置：${route.params.start}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>{`倉庫區域：${route.params.number}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                {`掃描到裝車單號：`}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: '#37393e',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setLoadingNumber('');
              }}>
              <Text style={{color: 'white', fontSize: 16}}>刪除</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 16}}>
              {`${loadingNumber} `}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
            }}></View>
        </View>
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

export {AssembleCarScannerPage};

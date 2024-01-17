import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {AppBar} from '../components/AppBar';
import {BackButton} from '../components/BackButton';
import {Menu} from 'react-native-paper';

import {AppContext} from '../AppContext';

const AreaLocationPage = ({navigation}) => {
  const window = useWindowDimensions();
  const appCtx = React.useContext(AppContext);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [dataArray, setDataArray] = React.useState([]);
  const [dataArray1, setDataArray1] = React.useState([]);
  const [firstNumber, setFirstNumber] = React.useState('');
  const [lastNumber, setLastNumber] = React.useState('');
  const [firstId, setFirstId] = React.useState('');
  const [lastId, setLastId] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      startGetWaitStart();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const startGetWaitStart = async () => {
    setDataArray([]);
    const data = await appCtx.credotV2FetchApiGet(`app/warehouse/locations`);
    setDataArray(data.data);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    return () => {
      unsubscribe();
    };
  }, []);

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

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/img_bg_01.png')}
        style={{width: window.width, height: window.height}}>
        <SafeAreaView style={{flex: 1}}>
          <AppBar
            title="選擇入庫位置"
            left={<BackButton onPress={() => navigation.pop()} />}
          />

          <View
            style={{height: 1, backgroundColor: 'white', marginBottom: 10}}
          />
          <View
            style={{
              marginHorizontal: 20,
              flex: 1,
            }}>
            <Text style={{color: 'white', fontSize: 18}}>請選擇區域</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{marginLeft: 10, flex: 1}}>
                <Menu
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <Anchor
                      title="請選擇第幾區"
                      onPress={() => setVisible(true)}
                      show={firstNumber.length == 0}
                      setTitle={firstNumber}
                    />
                  }>
                  {dataArray &&
                    dataArray.map((e, index) => (
                      <Menu.Item
                        key={e.district}
                        title={e.district}
                        onPress={() => {
                          console.log(
                            `e-------------------${e.district} ${index}`,
                          );
                          setFirstNumber(e.district);
                          setLastNumber('');
                          setVisible(false);
                          setDataArray1(e.warehouseSubLocations);
                          setFirstId(e.id);
                          // startGetWaitNumber(e);
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
              <View style={{marginLeft: 10, flex: 1}}>
                <Menu
                  visible={visible1}
                  onDismiss={() => setVisible1(false)}
                  anchor={
                    <Anchor
                      title="請選擇此區位置"
                      onPress={() => {
                        console.log('觸發區域');
                        console.log(visible1);
                        console.log(dataArray1);

                        setVisible1(true);
                      }}
                      show={lastNumber.length == 0}
                      setTitle={lastNumber}
                    />
                  }>
                  {dataArray1 &&
                    dataArray1.map((e, index) => (
                      <Menu.Item
                        key={e.name}
                        title={e.name}
                        onPress={() => {
                          console.log(`e-------------------${e.name} ${index}`);
                          setLastNumber(e.name);
                          setVisible1(false);
                          setLastId(e.id);
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

          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginVertical: 6,
              height: 50,
              justifyContent: 'center',
              marginVertical: 15,
              marginHorizontal: 20,
              borderColor: 'rgb(86,89,95)',
              borderWidth: 1,
            }}
            onPress={() => {
              if (firstNumber.length == 0 || lastNumber.length == 0) {
                Alert.alert(`系統提醒`, `請確認區域`, [
                  {
                    text: '確定',
                    onPress: () => {},
                  },
                ]);
              } else {
                navigation.navigate('AssembleCarScanner', {
                  start: firstNumber,
                  number: lastNumber,
                  status: 1,
                  shippedFirstId: firstId,
                  shippedLastId: lastId,
                });
              }
            }}>
            <Text
              style={{
                position: 'absolute',
                color: 'white',
                fontSize: 22,
              }}>
              掃描
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export {AreaLocationPage};

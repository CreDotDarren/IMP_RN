import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AppContext} from '../AppContext';

const HomePage = ({navigation, route}) => {
  const [_ip, setIp] = React.useState('');

  const window = useWindowDimensions();

  const [index, setIndex] = React.useState(1);
  const [gfStatus, setGfStatus] = React.useState(route.params.gfStatus);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    console.log(`----------${route.params.gfStats}`);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
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
            <ScrollView style={{marginVertical: 15}}>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                }}>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginBottom: 7,
                    }}>
                    <View style={{width: 27}} />

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                      onPress={() => setIndex(1)}>
                      <View
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 22,
                          }}>
                          中龍-進貨
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                          }}>
                          Purchase details
                        </Text>
                      </View>
                      <Image
                        source={
                          index === 1
                            ? require('../assets/btn_big_w_pressed.png')
                            : require('../assets/btn_big_w_regular.png')
                        }
                        resizeMode="stretch"
                        style={{
                          width: '100%',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{width: 27}} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginBottom: 7,
                    }}>
                    <View style={{width: 27}} />

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                      onPress={() => setIndex(2)}>
                      <View
                        style={{
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 22,
                          }}>
                          倉庫出貨
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                          }}>
                          Warehouse shipment
                        </Text>
                      </View>
                      <Image
                        source={
                          index === 2
                            ? require('../assets/btn_big_r_pressed.png')
                            : require('../assets/btn_big_r_regular.png')
                        }
                        resizeMode="stretch"
                        style={{
                          width: '100%',
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{width: 27}} />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                height: 70,
                // paddingVertical: 10,
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: window.width / 2,
                }}
                onPress={() => {
                  if (index === 1) {
                    navigation.navigate('AreaLocation');
                  } else if (index === 2) {
                    navigation.navigate('Scanner');
                  }
                }}>
                <Image
                  style={{width: window.width / 2}}
                  source={require('../assets/btn_in_regular.png')}
                />
                <Text
                  style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 22,
                  }}>
                  進入
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: window.width / 2,
                }}
                onPress={() => navigation.goBack()}>
                <Image
                  style={{width: window.width / 2}}
                  source={require('../assets/btn_out_regular.png')}
                />
                <Text
                  style={{
                    position: 'absolute',
                    color: 'white',
                    fontSize: 22,
                  }}>
                  退出
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
};

export {HomePage};

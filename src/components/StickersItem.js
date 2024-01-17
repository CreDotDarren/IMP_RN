import React from 'react';
import {View, Text} from 'react-native';

const StickersItem = ({_id, mechanicalCompany, specification, length}) => {
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgb(73,74,78)',
        }}>
        <View
          style={{
            margin: 5,
            color: 'white',
            flex: 1,
          }}>
          <View
            style={{
              color: 'white',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
              }}>
              ID
            </Text>
            <Text
              style={{
                color: 'white',
                marginHorizontal: 10,
                fontSize: 20,
              }}>
              {`${_id}`}
            </Text>
            <View style={{flex: 1}} />
            <Text
              style={{
                color: 'white',
                marginHorizontal: 10,
                fontSize: 20,
              }}>
              {`${mechanicalCompany}`}
            </Text>
          </View>
          <View
            style={{
              color: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              規格
            </Text>
            <Text
              style={{
                color: 'white',
                marginHorizontal: 10,
                fontSize: 20,
              }}>
              {`${specification}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 110,
            height: 80,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 2,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                height: '35%',
                color: 'white',
                fontSize: 16,
              }}>
              長度
            </Text>
            <Text style={{height: '35%', color: 'white', fontSize: 20}}>
              {`${length}m`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{height: 10, width: '100%', backgroundColor: 'black'}} />
    </View>
  );
};

export {StickersItem};

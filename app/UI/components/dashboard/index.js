/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect, useRef} from 'react';
import {View, Text, FlatList,ScrollView} from 'react-native';
import Size from '../../styles/Size';
import Gradientview from '../../reusables/Gradientview';
import Fontstyle from '../../styles/Fontstyle';
import Color from '../../styles/Color';


import Actions from 'actions';

const Dashboard = () => {
  const [_interval, set_interval] = useState(null);
  const [_datasource, set_datasource] = useState([
    {
      id: 0,
      company_name: 'GEP',
      meeting_time: '11:30 AM',
      des: 'Regarding Mobile Application',
    },
    {
      id: 1,
      company_name: 'Envisinard',
      meeting_time: '01:00 PM',
      des: 'Regarding web project,Application deadline date',
    },
    {
      id: 2,
      company_name: 'Capegimini',
      meeting_time: '02:00 PM',
      des: 'Regarding new web project',
    },
    {
      id: 3,
      company_name: 'Infosys',
      meeting_time: '03:40 PM',
      des: 'Regarding delay in deadlines',
    },
    {
      id: 4,
      company_name: 'Wipro',
      meeting_time: '05:00 PM',
      des: 'Regarding web project deadline date',
    },
    {
      id: 5,
      company_name: 'Devis Index',
      meeting_time: '06:20 PM',
      des: 'Regarding web project deadline date',
    },
  ]);

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds =>
        seconds === _datasource.length - 1 ? 0 : seconds + 1,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  // console.warn('This will run every second!', _datasource[seconds]);
  return (
    <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
      <View
        style={{
          height: Size.OF30,
          width: '90%',
          marginTop: Size.OF10,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <Gradientview colors={['#9E34E0', '#C087E3', '#5BAFED']}>
            <View style={{flex:1,width:'100%',justifyContent:'space-evenly',alignItems:'center'}}>
            <Text
            style={[
              Fontstyle.FONT_MEDIUM_LARGE,
              {
                color: Color.white,
              },
            ]}>
            {_datasource[seconds].company_name}
          </Text>
          <Text
            style={[
              Fontstyle.FONT_XXLARGE,
              {
                color: Color.white,
                fontWeight: 'bold',
              },
            ]}>
            {_datasource[seconds].meeting_time}
          </Text>
          <Text
            style={[
              Fontstyle.FONT_MEDIUM_SMALL,
              {
                color: Color.white,
                textAlign: 'center',
              },
            ]}>
            {_datasource[seconds].des}
          </Text>
 
            </View>
       
            <View style={{height:Size.OF3,width:'100%',alignItems:'center',justifyContent:'center'}}>
          <ScrollView horizontal={true}>
          {_datasource.map((item, index) => (
              <View
              key={index}
              style={{
                height: 8,
                width: 8,
                marginHorizontal: 8,
                borderRadius: 5,
                backgroundColor: index === seconds ? '#707070' : 'white',
              }}
            /> 
          ))}
   </ScrollView>
          </View>
          <Text
            style={[
              Fontstyle.FONT_MEDIUM_LARGE,
              {
                color: Color.white,
                textAlign: 'center',
                margin:Size.OF2
              },
            ]}>
            Today's Meetings
          </Text>
        </Gradientview>
      </View>
    </View>
  );
};

export default Dashboard;

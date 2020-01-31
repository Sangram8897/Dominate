import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';

const FilterModal = props => {
  return (
    <TouchableOpacity
      onPress={() => props.closeFilter()}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          height: Size.OF65,
          backgroundColor: Color.white,
          width: '100%',
        }}>
        <View
          style={{
            height: Size.OF10,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              Fontstyle.FONT_LARGE,
              {color: Color.white, marginLeft: Size.OF2},
            ]}>
            Sort and Filters
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={[Fontstyle.FONT_MEDIUM, {marginLeft: Size.OF1}]}>
              Type
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[Fontstyle.FONT_MEDIUM, {marginLeft: Size.OF1}]}>
              Degree
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FilterModal;

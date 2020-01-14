import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import useBackHandler from 'hooks/useBackHandler';
import Size from '../../styles/Size';
import Color from '../../styles/Color';
import Fontstyle from '../../styles/Fontstyle';
import Button from '../../reusables/Button';
import Strings from '../../styles/String';
import {useSelector, useDispatch} from 'react-redux';
import Actions from 'actions';

const Welcome = props => {
  const [_items, set_items] = useState([]);
  const dispatch = useDispatch();

  useBackHandler(() => {
    props.navigation.goBack();
    return true;
  });

  useEffect(() => {
    const data = props.navigation.state.params.data;
    set_items(data);
  }, [props.navigation.state.params.data]);
  return (
    <ImageBackground
      source={require('images/authbackImage/background1.png')}
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
      }}>
      <View
        style={{
          height: Size.OF65,
          width: '90%',
          marginBottom: Size.OF4,
          borderRadius: 15,
          padding: Size.OF3,
          backgroundColor: Color.white,
          elevation: 10,
        }}>
        <Image
          source={require('../../../assets/icons/app-icon/app1.png')}
          style={{
            height: Size.OF12,
            width: Size.OF20,
            resizeMode: 'contain',
          }}
        />
        <Text style={Fontstyle.FONT_LARGE}>{Strings.str_sign_up_thankyou}</Text>
        <Text style={[Fontstyle.FONT_SMALL, {color: Color.gray}]}>
          {Strings.str_sign_up_signup_success}
        </Text>
        <Text style={[Fontstyle.FONT_SMALL, {marginTop: Size.OF2}]}>
          {Strings.str_sign_up_workspacename}
        </Text>
        {_items && (
          <Text style={[Fontstyle.FONT_SMALL, {color: Color.gray}]}>
            {_items.workspaceId}
          </Text>
        )}

        <Text style={[Fontstyle.FONT_SMALL, {marginTop: Size.OF2}]}>
          {Strings.str_sign_up_workspaceURL}
        </Text>
        {_items && (
          <Text style={[Fontstyle.FONT_SMALL, {color: Color.gray}]}>
            {_items.workspaceUrl}
          </Text>
        )}
        <View
          style={{
            flex: 1,
            width: '70%',
            justifyContent: 'center',
          }}>
          <Button
            onPressedFunction={() => {
              const user = {
                email: _items.email,
                workspaceId: _items.workspaceId,
                workspaceUrl: _items.workspaceUrl,
              };
              dispatch(Actions.SignUp_COMPLETE(user));
              props.navigation.navigate('Auth');
            }}
            backColor={Color.primary2}
            borderColor={Color.primary2}
            label={Strings.str_sign_up_continue}
            textColor={Color.white}
          />
        </View>
        <Text style={[Fontstyle.FONT_XSMALL, {color: Color.gray}]}>
          {Strings.str_sign_up_copyright2019}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Welcome;

import React, {Component} from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Size from '../../../styles/Size';
import Fontstyle from '../../../styles/Fontstyle';
import Color from '../../../styles/Color';
//import basic react native components

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
      textInputs: [],
      textInputvalue: {},
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item.isExpanded) {
      return {layoutHeight: null, textInputs: prevState.textInputs};
    } else {
      return {
        layoutHeight: 0,
      };
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    if (this.state.textInputs !== nextState.textInputs) {
      nextState.textInputs = this.state.textInputs;
      return true;
    }
    return false;
  }

  // componentDidMount()
  // {
  //   console.warn(this.props.ac)
  // }
  // componentDidUpdate(preprops,prestate)
  // {
  //   console.warn(prestate);
  // }
  // getSnapshotBeforeUpdate()
  // {
  //   console.warn(this.props.ac)
  // }
  render() {
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={Fontstyle.FONT_SMALL}>{this.props.item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          <View
            style={{height: Size.OF8,justifyContent:'center', width: '100%'}}>
            <TextInput
              style={[Fontstyle.FONT_SMALL,{
                backgroundColor:Color.white,
                color: Color.gray,
                flex:1,
                borderBottomWidth:1,
                borderColor:Color.gray,
              }]}
              placeholder={'Enter Link here'}
              onChangeText={text => {
                const data={
                  key: this.props.index,
                  account: this.props.item.name,
                  value: text,
                }
                this.setState({
                  textInputvalue: data,
                });
              }}
              onEndEditing={() => {
                this.props.getValue(this.state.textInputvalue);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default class Expandable extends Component {
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {listDataSource: CONTENT};
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex].isExpanded = !array[placeindex].isExpanded)
        : (array[placeindex].isExpanded = false),
    );
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={Fontstyle.FONT_MEDIUM}>Add Other media Accounts</Text>
        <ScrollView>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.name}
              index={key}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
              getValue={this.props.getValue}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  header: {
    height: Size.OF6,
    justifyContent: 'flex-end',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    id: 0,
    isExpanded: false,
    name: 'LinkedIn',
    subcategory: [{id: 1, val: 'Sub Cat 1'}, {id: 3, val: 'Sub Cat 3'}],
  },
  {
    id: 1,
    isExpanded: false,
    name: 'Facebook',
    subcategory: [{id: 2, val: 'Sub Cat 4'}, {id: 5, val: 'Sub Cat 5'}],
  },
  {
    id: 2,
    isExpanded: false,
    name: 'Instagram',
    subcategory: [{id: 3, val: 'Sub Cat 7'}, {id: 9, val: 'Sub Cat 9'}],
  },
  {
    id: 3,
    isExpanded: false,
    name: 'Others',
    subcategory: [{id: 4, val: 'Sub Cat 10'}, {id: 12, val: 'Sub Cat 2'}],
  },
];

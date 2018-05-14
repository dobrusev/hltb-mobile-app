import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TextInput,
  Keyboard
} from 'react-native';
//import Button from '../components/Button/Button';
import C from '../constants';
import HltbRequester from '../lib/HltbRequester/';
import AwesomeButton from 'react-native-awesome-button';

const Icon = require('../../assets/img/hltb_icon.png');

export default class Home extends Component {
  static navigationOptions = {
    title: 'How Long To Beat',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      submitDisabled: true,
      isLoading: false,
      buttonState: 'idle'
    };

    this.handleSearch = this.onSubmitText.bind(this);
  }

  render() {
    return (
      <View style={[styles.rootContainer, styles.spaceBetween]}>
        <View style={[styles.row, styles.center]}>
          <Image source={Icon} style={styles.iconSize}/>
          <Text style={styles.h1}>{'How Long To Beat?'}</Text>
        </View>
        {this.renderTextInput()}
        <Text
          style={styles.h4}
          onPress={this.onAbout}>{'About'}</Text>
      </View>
    );
  }

  renderTextInput() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize={'words'}
          autoCorrect={false}
          autoFocus={false}
          returnKeyType={'search'}
          placeholder={'Search for games ...'}
          onChangeText={this.onTextChange}
          onSubmitEditing={this.onSubmitText}
        />
       <AwesomeButton
          states={{
            idle: {
              text: 'Search',
              backgroundStyle: {
                backgroundColor: 'blue',
                minHeight: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30
              },
              labelStyle: {
                color: 'white',
                alignSelf: 'center',
                marginLeft: 20,
                marginRight: 20
              },
              onPress: this.handleSearch
            },
            busy: {
              text: 'Searching ...',
              backgroundStyle: {
                backgroundColor: 'blue',
                minHeight: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30
              },
              labelStyle: {
                color: 'white',
                alignSelf: 'center',
                marginLeft: 20,
                marginRight: 20
              }
            }
          }}
          transitionDuration={400}
          buttonState={this.state.buttonState}
        />
      </View>
    );
  }

  onTextChange = (text) => {
    this.setState({query: text, submitDisabled: text === ''});
  }

  onSubmitText = () => {
    if (!this.state.query || this.state.query.length === 0) return;
    Keyboard.dismiss();
    this.setState({isLoading: true});
    this.setState({ buttonState: 'busy' });
    HltbRequester.fetchAndParse(this.state.query)
      .then((games) => {
        this.props.navigation.navigate('SearchResult', {games: games});
      })
      .catch((error) => {
        Alert.alert('Ooops!', `An error has occurred, please let me know via Twitter (@nikolasmoya).\n\n${error}`);
      })
      .then(() => {
        this.setState({isLoading: false});
        this.setState({ buttonState: 'idle' });
      });
  }

  onAbout = () => {
    this.props.navigation.navigate('About');
  }
}

const styles = StyleSheet.create({
  iconSize: {
    width: 100,
    height: 100,
    marginRight: 20
  },

  textInputContainer: {
    height: 40,
    flexDirection: 'row'
  },

  textInput: {
    flex: 1,
    marginRight: 7,
    borderWidth: 0,
    borderColor: '#000000'
  },

  rootContainer: {
    flex: 1,
    padding: 20,
    borderWidth: 0,
    borderColor: '#000000'
  },

  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  row: {
    flexDirection: 'row'
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  h1: {
    fontSize: 24,
  },

  h4: {
    fontSize: 14,
  }
});

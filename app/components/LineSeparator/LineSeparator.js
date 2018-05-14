import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import C from '../../constants';

export default class LineSeparator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({

});

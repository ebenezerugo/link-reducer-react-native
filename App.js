/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import axios from 'axios';

import Header from './components/Header';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    marginHorizontal: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#EFF3C6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  img: {
    width: 100,
    height: 100,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api')
      .then(response => {
        const links = response.data;
        this.setState({links});
      })
      .catch(error => {
        console.log(error);
      });
  }

  list = () => {
    return this.state.links.map(link => {
      return (
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            {/* <Text style={styles.sectionTitle}>{link.name}</Text> */}
            <Image
              style={styles.img}
              source={{
                uri: 'http://localhost:8000/' + link.qrCode,
              }}
            />
            <Text style={styles.sectionDescription}>
              <Text style={styles.highlight}>Name:</Text> {link.name}
            </Text>
            <Text style={styles.sectionDescription}>
              <Text style={styles.highlight}>Description:</Text>{' '}
              {link.description}
            </Text>
            <Text style={styles.sectionDescription}>
              <Text style={styles.highlight}>Link:</Text> {link.link}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>{this.list()}</View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

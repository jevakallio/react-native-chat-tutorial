import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
} from 'react-native';

import ReversedFlatList from 'react-native-reversed-flat-list';

import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'Jani';
const CHANNEL = 'Reactivate';

export default class App extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }

  send = async () => {
    // read message from component state
    const message = this.state.typing;

    // send message to our channel, with sender name
    await send({
      channel: CHANNEL,
      sender: NAME,
      message,
    });

    // set the component state (clears text input)
    this.setState({
      typing: '',
    });
  };

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar backgroundColor="lightseagreen" barStyle="light-content" />
          <Text style={styles.title}>#{CHANNEL}</Text>
        </View>
        <ReversedFlatList
          data={this.state.messages}
          renderItem={this.renderItem}
        />
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.typing}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({typing: text})}
            />
            <TouchableOpacity onPress={this.send}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },

  header: {
    height: 80,
    backgroundColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },

  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
});

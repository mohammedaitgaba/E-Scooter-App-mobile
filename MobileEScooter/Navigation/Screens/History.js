import React,{useEffect,useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

const data = [
  { id: 1, title: 'Card 1', description: 'This is the description of card 1.' },
  { id: 2, title: 'Card 2', description: 'This is the description of card 2.' },
  { id: 3, title: 'Card 3', description: 'This is the description of card 3.' },
];

const renderItem = ({ item }) => {
  
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>{item.title}</Card.Title>
      <Card.Divider />
      <Text style={styles.description}>{item.description}</Text>
      <Button
        title="Show On map"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </Card>
  );
};

const keyExtractor = (item) => item.id.toString();

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00bfff',
    borderRadius: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default HistoryScreen;

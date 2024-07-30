/* eslint-disable prettier/prettier */
// src/screen/ResultPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: { gptResult: string };
};

type ResultPageNavigationProp = StackNavigationProp<RootStackParamList, 'ResultPage'>;
type ResultPageRouteProp = RouteProp<RootStackParamList, 'ResultPage'>;

type Props = {
  navigation: ResultPageNavigationProp;
  route: ResultPageRouteProp;
};

const ResultPage: React.FC<Props> = ({ route }) => {
  const { gptResult } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPT Results</Text>
      <Text style={styles.result}>{gptResult}</Text>
    </View>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
  },
});
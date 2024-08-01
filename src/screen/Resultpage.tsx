/* eslint-disable prettier/prettier */
// src/screen/ResultPage.tsx
import React from 'react';
import { ScrollView,View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type GPTResult = {
  BookCategory: string;
  BookType: string;
  BookTitle: string;
  BookAuthor: string;
  BookDescription: string;
  BookLength: string;
};

type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: { gptResult: GPTResult };
};

type ResultPageNavigationProp = StackNavigationProp<RootStackParamList, 'ResultPage'>;
type ResultPageRouteProp = RouteProp<RootStackParamList, 'ResultPage'>;

type Props = {
  navigation: ResultPageNavigationProp;
  route: ResultPageRouteProp;
  gptResult: {
    BookCategory: string;
    BookType: string;
    BookTitle: string;
    BookAuthor: string;
    BookDescription: string;
    BookLength: string;
  };
};

const ResultPage: React.FC<Props> = ({ route }) => {
  const { gptResult } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>AI 책 추천 결과</Text>

        <Text style={styles.subtitle}>Book Category</Text>
        <Text style={styles.result}>{gptResult.BookCategory}</Text>

        <Text style={styles.subtitle}>Book Length</Text>
        <Text style={styles.result}>{gptResult.BookLength}</Text>
        
        <Text style={styles.subtitle}>Book Type</Text>
        <Text style={styles.result}>{gptResult.BookType}</Text>
        
        <Text style={styles.subtitle}>Book Title</Text>
        <Text style={styles.result}>{gptResult.BookTitle}</Text>
        
        <Text style={styles.subtitle}>Book Author</Text>
        <Text style={styles.result}>{gptResult.BookAuthor}</Text>
        
        <Text style={styles.subtitle}>Book Description</Text>
        <Text style={styles.result}>{gptResult.BookDescription}</Text>


      </View>
    </ScrollView>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 6,},
  result: {
    fontSize: 16,
    textAlign: 'center',
  },
});
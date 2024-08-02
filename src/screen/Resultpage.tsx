/* eslint-disable prettier/prettier */
// src/screen/ResultPage.tsx
import React from 'react';
import { ScrollView,View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  MyBook: { gptResult: GPTResult };
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


const ResultPage: React.FC<Props> = ({ navigation, route }) => {
  const { gptResult } = route.params;

  const navigateToBookSelect = () => {
    navigation.navigate('BookSelect');
  }

  const navigateToMyBook = () => {
    navigation.navigate('MyBook', {gptResult});
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
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
          <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={navigateToMyBook}>서재에 담을래요🥰</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={navigateToBookSelect}>
                <Text style={styles.buttonText}>다시 추천 받을래요🥺</Text>
              </TouchableOpacity>
            </View>

        </View>

      </View>
    </ScrollView>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },

  btnContainer: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    alignItems: 'center',
    backgroundColor: '#F2EDE3',
    padding: 10,
    marginRight: 10,

  },
  buttonText: {
    fontWeight: '600', // 글씨 굵기를 조절합니다.
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,

  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 6,
  },
  result: {
    fontSize: 15,
    backgroundColor: '#E8DFCA',
    padding: 10,
  },
});
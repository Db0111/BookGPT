/* eslint-disable prettier/prettier */
//Todo 추천 도서 맘에 들어요 누를 경우 , 저장하기
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

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


type MyBookRouteProp = RouteProp<RootStackParamList, 'MyBook'>;

type Props = {
  route: MyBookRouteProp;
};
const MyBook = ({route}: Props) => {
    const { gptResult } = route.params

    const bookTitle = gptResult.BookTitle;
    const bookAuthor = gptResult.BookAuthor;
    const bookCategory = gptResult.BookCategory;

    return (
        <View>
            <Text>My Book</Text>
            <View style={styles.container}>
                <Text>분야: {bookCategory}</Text>
                <Text>제목: {bookTitle}</Text>
                <Text>저자: {bookAuthor}</Text>
            </View>
        </View>
    )
  } 


export default MyBook;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },


})


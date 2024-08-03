/* eslint-disable prettier/prettier */
//Todo 추천 도서 맘에 들어요 누를 경우 , 저장하기
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Tag from '../components/tag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GPTResult } from './ResultPage';


type BookResult = {
    BookImage: string;
  }



const MyBook = () => {

    const [bookData, setBookData] = useState<BookResult & GPTResult | null>(null);

    useEffect(() => {
        const fetchBookData = async () => {
        const storedData = await AsyncStorage.getItem('bookData');
        if (storedData !== null) {
            setBookData(JSON.parse(storedData));
        } else {
            setBookData(null);
        };
    }

    fetchBookData();
  }, []);

    return (
        <View>
            <View style={styles.container}>
            
                <Image source={{ uri: bookData?.BookImage }}/>
                <Tag title={bookData?.BookCategory} />
                <Text style={styles.bookTitle}>{bookData?.BookTitle}</Text>
                <Text style={styles.bookAuthor}>{bookData?.BookAuthor}</Text>

            </View>
        </View>
    );
  };


export default MyBook;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    bookTitle: {
        fontSize: 17,
        fontWeight: '500',
    },
    bookAuthor: {
        fontSize: 14,
        fontWeight:'400',
    }





});


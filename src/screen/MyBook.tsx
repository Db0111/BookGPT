/* eslint-disable prettier/prettier */
//Todo 추천 도서 맘에 들어요 누를 경우 , 저장하기
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';


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
    ResultPage: { gptResult: GPTResult };ㅣ
    MyBook: { gptResult: GPTResult };
  };


type MyBookRouteProp = RouteProp<RootStackParamList, 'MyBook'>;

type Props = {
  route: MyBookRouteProp;
};
const MyBook = ({route}: Props) => {
    const { gptResult } = route.params;

    const [bookImageUrl, setBookImageUrl] = useState<string | null>(null);


    const bookTitle = gptResult.BookTitle;
    const bookAuthor = gptResult.BookAuthor;
    const bookCategory = gptResult.BookCategory;

    useEffect(() => {
        const fetchBookImage = async () => {
            try {
                const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
                    headers: {
                        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
                    },
                    params: {
                        query: gptResult.BookTitle,
                        size: 1,
                    },
            })
            if (response.data.documents && response.data.documents.length > 0) {
                setBookImageUrl(response.data.documents[0].thumbnail);
            }
        } catch (error) {
            console.error('Error fetching book image:', error);
        }
    };

    fetchBookImage();
}, [gptResult.BookTitle]);

    return (
        <View>
            <Text>My Book</Text>
            <View style={styles.container}>
                {bookImageUrl && (
                        <Image
                            source={{ uri: bookImageUrl }}
                            style={styles.bookImage}
                        />
                    )}
                <Text>분야: {bookCategory}</Text>
                <Text>제목: {bookTitle}</Text>
                <Text>저자: {bookAuthor}</Text>
                
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
    bookImage: {
        width: 100,
        height: 150,
        marginTop: 20,
    },


});


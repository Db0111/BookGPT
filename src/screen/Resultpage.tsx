/* eslint-disable prettier/prettier */
// src/screen/ResultPage.tsx
import React from 'react';
import { Image, ScrollView,View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {getPrompt} from '../utils/prompt';
import {OPENAI_API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';

export type GPTResult = {
  BookCategory: string;
  BookType: string;
  BookTitle: string;
  BookAuthor: string;
  BookDescription: string;
  BookLength: string;
};

type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: {selectedOptions: {[key: string]: boolean}};
  MyBook: undefined;
};

type ResultPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResultPage'>;
type ResultPageScreenRouteProp = RouteProp<RootStackParamList, 'ResultPage'>;

type Props = {
  navigation: ResultPageScreenNavigationProp;
  route: ResultPageScreenRouteProp;
  gptResult: {
    BookCategory: string;
    BookType: string;
    BookTitle: string;
    BookAuthor: string;
    BookDescription: string;
    BookLength: string;
  };
};


export function ResultPage({ navigation, route }: Props): React.JSX.Element{
  const { selectedOptions } = route.params;
  const [gptResult, setGptResult] = React.useState<GPTResult>({});
  const [isLoading, setIsLoading] = React.useState(false);


  const fetchGPTResult = async (messages: any): Promise<GPTResult> => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            messages: messages,
            max_tokens: 700,
            model: 'gpt-4o-mini',
            stream: false,
            temperature: 0,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from OpenAI:', errorData);
        throw new Error('Error fetching GPT result');
      }

      const data = await response.json();
      console.log('Response from OpenAI:', data);
      const result = JSON.parse(data.choices[0]?.message?.content.trim()) || '{}';
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error fetching GPT result:', error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const promptMessages = getPrompt(selectedOptions);
        const result = await fetchGPTResult(promptMessages);
        setGptResult(result);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [selectedOptions]);

  const [bookImageUrl, setBookImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookImage = async () => {
      try {
        if (gptResult && gptResult.BookTitle) {
          const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
            headers: {
              Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
            },
            params: {
              query: gptResult.BookTitle,
              size: 2,
            },
          });
          if (response.data.documents && response.data.documents.length > 0) {
            setBookImageUrl(response.data.documents[0].thumbnail);
          }
        }
      } catch (error) {
        console.error('Error fetching book image:', error);
      }
    };

    fetchBookImage();
  }, [gptResult]);

  const navigateToBookSelect = () => {
    navigation.navigate('BookSelect');
  };

  const navigateToMyBook = () => {
    navigation.navigate('MyBook');
  };
  //todo 왜 데이터가 추가되지 않고 계속 덮어씌워지는지 확인
  const saveMyBook = async () => {
    try {
      const bookData = {
        ...gptResult,
        BookImage: bookImageUrl,
      }
      await AsyncStorage.setItem('bookData', JSON.stringify(bookData));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size='large' color="#0000ff" style={styles.loading}/>
        ) : (<View>
          <Text style={styles.title}>AI 책 추천 결과</Text>
          <View style={styles.rightContainer}>
            {bookImageUrl && (
             <Image source={{ uri: bookImageUrl }} style={styles.bookImage}/>
              )
            }
            
          </View>

          <View style={styles.leftContainer}>
            <Text style={styles.subtitle}>Book Category</Text>
            <Text style={styles.result}>{gptResult.BookCategory}</Text>

            <Text style={styles.subtitle}>Book Length</Text>
            <Text style={styles.result}>{gptResult.BookLength}</Text>

          </View>

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
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    saveMyBook();
                    navigateToMyBook();
                  }
                }>서재에 담을래요🥰</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={navigateToBookSelect}>
                <Text style={styles.buttonText}>다시 추천 받을래요🥺</Text>
              </TouchableOpacity>
            </View>

        </View>
      )}


      </View>
    </ScrollView>
  );
}

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  loading: {
    width: '100%',
    justifyContent: 'center',

  },
  rightContainer: {
    width: '50%',    
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 50,
  },
  leftContainer: {
    width: '60%',    
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
  bookImage: {
    width: 130,
    height: 180,
    // marginTop: 10,
  },

});

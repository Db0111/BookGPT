/* eslint-disable prettier/prettier */
import React from 'react';
import type {PropsWithChildren} from 'react';

import {Alert, StyleSheet, Text, useColorScheme, View, TouchableOpacity} from 'react-native';
import {Button, SubmitBtn} from '../components/button';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';


type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: {selectedOptions: {[key: string]: boolean}};
  MyBook: undefined;
};

type BookSelectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookSelect'
>;
type BookSelectScreenRouteProp = RouteProp<RootStackParamList, 'BookSelect'>;

type SectionProps = PropsWithChildren<{
  title: string;
  children: React.ReactNode;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
type Props = {
  navigation: BookSelectScreenNavigationProp;
  route: BookSelectScreenRouteProp;
};

export function BookSelect({navigation}: Props): React.JSX.Element {
  //누른 옵션 하이라이트
  React.useLayoutEffect(() => {
    const navigateToMyBook = () => {
      navigation.navigate('MyBook');
    };

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToMyBook} style={styles.btn_mybook}>
          <Text>내 서재</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [selectedOptions, setSelectedOptions] = React.useState<{
    [key: string]: boolean;
  }>({});
  //책 유형(국내, 외국)
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  //책 분야(인문학, 경영)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const [selectedLength, setSelectedLength] = React.useState<string | null>(
    null,
  );

  const handlePress = (buttonKey: string) => {
    //handlePress 호출하면 isPressed가 true면 false로, false면 true로 바뀜
    setSelectedOptions(prevState => ({
      ...prevState,
      [buttonKey]: !prevState[buttonKey],
    }));
  };

  const handleCompleteSelection = async () => {
    if (selectedCategory && selectedType && selectedLength) {
      navigation.navigate('ResultPage', {selectedOptions});
    } else {
      Alert.alert('책 유형과 분야를 선택해주세요!');
    }
  };
  
  return (
    <View>
      <Section title="AI가 내 입맛대로 추천해주는 책📚">
        <Text style={{fontSize: 16}}>읽고 싶은 책에 대한 정보를 알려주세요!</Text>
      </Section>
      <Section title="도서유형">
        <Button
          title="국내도서"
          onPress={() => {
            setSelectedType('국내도서');
            handlePress('국내도서');
          }}
          pressed={selectedOptions['국내도서'] || false}
        />
        <Button
          title="외국도서"
          onPress={() => {
            setSelectedType('외국도서');
            handlePress('외국도서');
          }}
          pressed={selectedOptions['외국도서'] || false}
        />
      </Section>

      <Section title="분야">
        <Button
          title="소설"
          onPress={() => {
            setSelectedCategory('소설');
            handlePress('소설');
          }}
          pressed={selectedOptions['소설'] || false}
        />
        <Button
          title="시/에세이"
          onPress={() => {
            setSelectedCategory('시/에세이');
            handlePress('시/에세이');
          }}
          pressed={selectedOptions['시/에세이'] || false}
        />
        <Button
          title="인문학"
          onPress={() => {
            setSelectedCategory('인문학');
            handlePress('인문학');
          }}
          pressed={selectedOptions['인문학'] || false}
        />
        <Button
          title="과학"
          onPress={() => {
            setSelectedCategory('과학');
            handlePress('과학');
          }}
          pressed={selectedOptions['과학'] || false}
        />
        <Button
          title="역사"
          onPress={() => {
            setSelectedCategory('역사');
            handlePress('역사');
          }}
          pressed={selectedOptions['역사'] || false}
        />
        <Button
          title="경제"
          onPress={() => {
            setSelectedCategory('경제');
            handlePress('경제');
          }}
          pressed={selectedOptions['경제'] || false}
        />
        <Button
          title="종교"
          onPress={() => {
            setSelectedCategory('종교');
            handlePress('종교');
          }}
          pressed={selectedOptions['종교'] || false}
        />
        <Button
          title="예술"
          onPress={() => {
            setSelectedCategory('예술');
            handlePress('예술');
          }}
          pressed={selectedOptions['예술'] || false}
        />
        <Button
          title="기타"
          onPress={() => {
            setSelectedCategory('기타');
            handlePress('기타');
          }}
          pressed={selectedOptions['기타'] || false}
        />
      </Section>
      {/* Todo: bugfix 분량 부분 버튼 상태 미변경 버그 수정 필요 */}
      <Section title="분량">
        <Button
          title="100페이지 이하"
          onPress={() => {
            setSelectedLength('100페이지 이하');
            handlePress('100페이지 이하');
          }}
          pressed={selectedOptions['100페이지 이하'] || false}
        />
        <Button
          title="100~300페이지"
          onPress={() => {
            setSelectedLength('100~300페이지');
            handlePress('100~300페이지');
          }}
          pressed={selectedOptions['100~300페이지'] || false}
        />
        <Button
          title="300페이지 이상"
          onPress={() => {
            setSelectedLength('300페이지 이상');
            handlePress('300페이지 이상');
          }}
          pressed={selectedOptions['300페이지 이상'] || false}
        />
      </Section>
      <View style={styles.buttoncontainer}>
        <SubmitBtn title="AI의 선택은?" onPress={handleCompleteSelection} />
      </View>
    </View>
  );
}

export default BookSelect;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttoncontainer: {
    marginTop: 15,
    paddingHorizontal: 24,
  },
  btn_mybook: {
    marginRight: 15,
    height: 30,
  },
});

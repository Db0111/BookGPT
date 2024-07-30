import React from 'react';
import type {PropsWithChildren} from 'react';
import {getPrompt} from '../utils/prompt';

import {Alert, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Button, SubmitBtn} from '../components/button';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: {gptResult: string};
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
  const [pressedButtons, setPressedButtons] = React.useState<{
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
    setPressedButtons(prevState => ({
      ...prevState,
      [buttonKey]: !prevState[buttonKey],
    }));
  };

  const handleCompleteSelection = async () => {
    if (selectedCategory && selectedType && selectedLength) {
      const promptMessages = getPrompt(pressedButtons);
      const gptResult: string = await fetchGPTResult(promptMessages); // Specify the return type as string
      navigation.navigate('ResultPage', {gptResult});
    } else {
      Alert.alert('책 유형과 분야를 선택해주세요!');
    }
  };
  const fetchGPTResult = async (messages: any): Promise<string> => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            Messages: messages,
            max_tokens: 200,
            model: 'gpt-4o-mini',
            stream: false,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Error fetching GPT result');
      }

      const data = await response.json();
      const gptResult = data.choices[0]?.message?.content.trim() || 'nothing';
      console.log(gptResult);
      return gptResult;
    } catch (error) {
      console.error('Error fetching GPT result:', error);
      return 'error';
    }
  };
  return (
    <View>
      <Section title="책 선택">
        <Text>읽고 싶은 책에 대한 정보를 알려주세요!</Text>
      </Section>
      <Section title="도서유형">
        <Button
          title="국내도서"
          onPress={() => {
            setSelectedType('국내도서');
            handlePress('국내도서');
          }}
          pressed={pressedButtons['국내도서'] || false}
        />
        <Button
          title="외국도서"
          onPress={() => {
            setSelectedType('외국도서');
            handlePress('외국도서');
          }}
          pressed={pressedButtons['외국도서'] || false}
        />
      </Section>

      <Section title="분야">
        <Button
          title="소설"
          onPress={() => {
            setSelectedCategory('소설');
            handlePress('소설');
          }}
          pressed={pressedButtons['소설'] || false}
        />
        <Button
          title="시/에세이"
          onPress={() => {
            setSelectedCategory('시/에세이');
            handlePress('시/에세이');
          }}
          pressed={pressedButtons['시/에세이'] || false}
        />
        <Button
          title="인문학"
          onPress={() => {
            setSelectedCategory('인문학');
            handlePress('인문학');
          }}
          pressed={pressedButtons['인문학'] || false}
        />
        <Button
          title="과학"
          onPress={() => {
            setSelectedCategory('과학');
            handlePress('과학');
          }}
          pressed={pressedButtons['과학'] || false}
        />
        <Button
          title="역사"
          onPress={() => {
            setSelectedCategory('역사');
            handlePress('역사');
          }}
          pressed={pressedButtons['역사'] || false}
        />
        <Button
          title="경제"
          onPress={() => {
            setSelectedCategory('경제');
            handlePress('경제');
          }}
          pressed={pressedButtons['경제'] || false}
        />
        <Button
          title="종교"
          onPress={() => {
            setSelectedCategory('종교');
            handlePress('종교');
          }}
          pressed={pressedButtons['종교'] || false}
        />
        <Button
          title="예술"
          onPress={() => {
            setSelectedCategory('예술');
            handlePress('예술');
          }}
          pressed={pressedButtons['예술'] || false}
        />
        <Button
          title="기타"
          onPress={() => {
            setSelectedCategory('기타');
            handlePress('기타');
          }}
          pressed={pressedButtons['기타'] || false}
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
          pressed={pressedButtons['100페이지 이하'] || false}
        />
        <Button
          title="100~300페이지"
          onPress={() => {
            setSelectedLength('100~300페이지');
            handlePress('100~300페이지');
          }}
          pressed={pressedButtons['100~300페이지'] || false}
        />
        <Button
          title="300페이지 이상"
          onPress={() => {
            setSelectedLength('300페이지 이상');
            handlePress('300페이지 이상');
          }}
          pressed={pressedButtons['300페이지 이상'] || false}
        />
      </Section>
      <Section title="">
        <SubmitBtn
          title="선택 완료"
          onPress={handleCompleteSelection}
          // style={{
          //   backgroundColor: isPressed ? 'blue' : 'gray',
          // }}
        />
      </Section>
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
    fontSize: 22,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
});

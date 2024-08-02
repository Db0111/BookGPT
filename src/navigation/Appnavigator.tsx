import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BookSelect from '../screen/BookSelect';
import ResultPage from '../screen/ResultPage';
import MyBook from '../screen/MyBook';

export type RootStackParamList = {
  BookSelect: undefined;
  ResultPage: {gptResult: string};
  MyBook: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BookSelect">
      <Stack.Screen
        name="BookSelect"
        component={BookSelect}
        options={{title: '책 선택'}}
      />

      <Stack.Screen
        name="ResultPage"
        component={ResultPage}
        options={{title: 'Result'}}
      />
      <Stack.Screen
        name="MyBook"
        component={MyBook}
        options={{title: '내 서재'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

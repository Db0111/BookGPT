import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Tag = ({title}: {title: string}) => {
  return (
    <TouchableOpacity style={styles.tag}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
export default Tag;

const styles = StyleSheet.create({
  tag: {
    borderColor: 'black',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

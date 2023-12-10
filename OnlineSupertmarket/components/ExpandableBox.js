import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import TextOutput from '../components/TextOutput';

const ExpandableBox = ({title, content}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleBox = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleBox} style={styles.titleContainer}>
        <View style={styles.titleBorder}>
          <TextOutput textOutput={title} style={styles.boxLabel} />
        </View>
      </TouchableOpacity>
      {expanded && <View style={styles.boxContent}>{content}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  boxLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  boxContent: {
    padding: 10,
    marginBottom: 10,
  },
});

export default ExpandableBox;

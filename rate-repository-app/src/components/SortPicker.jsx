
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  label: {
    marginBottom: 5,
  },
});

const SortPicker = ({ sort, setSort }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label} fontWeight="bold">Sort by:</Text>
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue) => setSort(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export default SortPicker;
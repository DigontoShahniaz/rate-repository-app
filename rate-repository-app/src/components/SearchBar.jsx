
import { View, StyleSheet, TextInput } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5da',
    borderRadius: 4,
    padding: 10,
  },
});

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const debounced = useDebouncedCallback(
    (value) => setSearchQuery(value),
    500
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repositories..."
        onChangeText={debounced.callback}
      />
    </View>
  );
};

export default SearchBar;
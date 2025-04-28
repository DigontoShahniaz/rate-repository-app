
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    backgroundColor: '#0366d6',
    borderRadius: 4,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Pressable 
        style={styles.button}
        onPress={() => WebBrowser.openBrowserAsync(repository.url)}
      >
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
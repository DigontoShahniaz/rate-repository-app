
import { useQuery, useMutation } from '@apollo/client';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import { GET_CURRENT_USER, DELETE_REVIEW } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
  separator: {
    height: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({ variables: { id } });
            refetch();
          },
          style: 'destructive',
        },
      ],
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data.me.reviews.edges.map(edge => ({
    ...edge.node,
    repositoryId: edge.node.repository.id,
    repositoryName: edge.node.repository.fullName,
  }));

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <View style={styles.actions}>
            <View style={styles.actionButton}>
              <Button 
                onPress={() => navigate(`/repository/${item.repositoryId}`)}
              >
                View repository
              </Button>
            </View>
            <View style={styles.actionButton}>
              <Button 
                onPress={() => handleDelete(item.id)}
                color="error"
              >
                Delete review
              </Button>
            </View>
          </View>
        </View>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
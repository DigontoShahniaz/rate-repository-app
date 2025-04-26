
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';
import formatNumber from '../utils/formatNumber';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  name: {
    flex: 1,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 5,
  },
});

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold" style={styles.statValue}>
      {formatNumber(value)}
    </Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text fontWeight="bold" fontSize="subheading" style={styles.name}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem label="Stars" value={item.stargazersCount} />
        <StatItem label="Forks" value={item.forksCount} />
        <StatItem label="Reviews" value={item.reviewCount} />
        <StatItem label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
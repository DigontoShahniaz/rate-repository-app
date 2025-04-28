
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import { formatNumber } from '../utils/formatNumber';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  languageContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
  },
});

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text fontWeight="bold">{formatNumber(count)}</Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountItem label="Stars" count={item.stargazersCount} />
        <CountItem label="Forks" count={item.forksCount} />
        <CountItem label="Reviews" count={item.reviewCount} />
        <CountItem label="Rating" count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
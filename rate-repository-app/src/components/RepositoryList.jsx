
import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebouncedCallback } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import SortPicker from './SortPicker';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <View>
        <SearchBar 
          searchQuery={this.props.searchQuery} 
          setSearchQuery={this.props.setSearchQuery} 
        />
        <SortPicker 
          sort={this.props.sort} 
          setSort={this.props.setSort} 
        />
      </View>
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  let orderBy, orderDirection;
  switch (sort) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
  }

  const { repositories } = useRepositories({ 
    orderBy, 
    orderDirection,
    searchKeyword: searchQuery,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sort={sort}
      setSort={setSort}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
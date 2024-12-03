import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { fetchGitHubRepo } from '../api';
import SearchBar from './SearchBar';

/**
 *
 * @param onSearchResult - function that accepts results from GitHub API call
 * @param onLoadingStateChange - function that accepts a boolean indicating if loading is in progress
 */
function Search(props) {
  const { onSearchResult, onLoadingStateChange, clearSearch } = props;
  const [text, updateText] = useState('');
  useEffect(() => {
    let timerId;
    if (text.length > 3) {
      timerId = setTimeout(() => fetchItems(), 1000);
    } else {
      clearSearch();
    }
    return () => clearTimeout(timerId);
  }, [text]);

  async function fetchItems() {
    onLoadingStateChange(true);
    const result = await fetchGitHubRepo(text);
    onSearchResult && onSearchResult(result);
    onLoadingStateChange(false);
  }

  return (
    <View style={styles.container}>
      <View style={{ width: Dimensions.get('window').width - 35 }}>
        <SearchBar
          value={text}
          fontColor="white"
          onChange={(evt) => updateText(evt.nativeEvent.text)}
          onSubmitEditing={() => { }}
          onClear={() => {
            updateText('');
            clearSearch();
          }}
          clearIcon={text && text.length > 0 ? true : false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 12,
  },
});

export default Search;

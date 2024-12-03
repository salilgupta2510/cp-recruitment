import React from 'react';
import { SearchBar as LibrarySearchBar } from 'react-native-elements';
const SearchBar = (props) => {
  return (
    <LibrarySearchBar
      {...props}
      round
      returnKeyType="search"
      inputStyle={{
        backgroundColor: '#fff',
        color: '#292B33',
        fontSize: 14,
        marginLeft: 0,
      }}
      inputContainerStyle={{
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 4,
      }}
      containerStyle={{
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#C2C4CC',
        borderBottomColor: '#C2C4CC',
        borderTopColor: '#C2C4CC',
        borderRadius: 4,
        paddingLeft: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      leftIconContainerStyle={{
        padding: 0,
      }}
    />
  );
};

SearchBar.defaultProps = {
  placeholder: 'Search GitHub Repos',
};

export default SearchBar;

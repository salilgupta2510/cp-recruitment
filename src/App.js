import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Search from './components/Search';
import colors from './colors';
import Cell from './components/Cell';
import Sort from './components/Sort';
import ElementText from './components/atomic/Text';

const App = () => {
  const [isLoading, setLoadingState] = useState(false);
  const [currentRepos, updateRepos] = useState([]);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [favoriteReposList, updateFavoriteReposList] = useState([]);

  /**
   * Called when GitHub API calls finishes
   * @param results - Object containing "error" and "repos" properties
   * @type error - string or null
   * @type repos - Object, contains "items" property, which is an array of RepoItem
   * @type RepoItem - contains info about individual repo on github:
   *          id: repo id
   *          name: repo name
   *          created_at: timestamp when repo was created
   *          html_url: github url to the Repo
   *          stargazers_count: number of stars repo has
   *          owner: Object containing info about owner:
   *              login: github handle of the author
   */
  function onSearchResults(results) {
    const { repos, error } = results;
    console.log(results)
    if (error) {
      updateErrorMessage(error);
    } else {
      updateRepos(repos.items);
    }
  }

  function clearSearch(){
    updateRepos([]);
  }

  /**
   *
   * @param repoId - string, id of the repo to be added to favorites
   */
  function onAddToFavorite(repoId) {
    let favList = [...favoriteReposList];
    let index = favList.indexOf(repoId);

    if (index > -1) {
      favList = [...favList.slice(0, index), ...favList.slice(index)];
    } else {
      favList = [...favList, repoId];
    }

    updateFavoriteReposList(favList);
  }

  return (
    <>
      {/* <StatusBar
        backgroundColor={colors.backgroundColor}
        barStyle="dark-content"
      /> */}
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <ElementText h4 h4Style={styles.titleStyle}>GitHubList</ElementText>
        </View>
        <View style={styles.flexOne}>
          <Search
            onLoadingStateChange={newLoadingState =>
              setLoadingState(newLoadingState)
            }
            onSearchResult={onSearchResults}
            clearSearch={clearSearch}
          />
          {errorMessage && (
            <View>
              <Text style={[styles.flexOne, styles.errorText]}>{errorMessage}</Text>
            </View>
          )}
          {isLoading && (
            <View style={[styles.flexOne, styles.loadingContainer]}>
              <ActivityIndicator size="large" color={colors.accent1} />
            </View>)}
           {currentRepos?.length > 0 && !isLoading &&  (<>
              <Sort onSort={updateRepos} currentRepos={currentRepos} />
              <ScrollView contentContainerStyle={styles.content}>
                {currentRepos.map(repo => {
                  return (
                    <Cell
                      testID={`cell-${repo.id}`}
                      key={repo.id}
                      id={repo.id}
                      avatar={repo.owner.avatar_url}
                      owner={repo.owner.login}
                      title={repo.name}
                      stars={repo.stargazers_count}
                      timestamp={repo.created_at}
                      url={repo.html_url}
                      isFavorite={favoriteReposList.includes(repo.id)}
                      onAddFavorite={onAddToFavorite}
                    />
                  );
                })}
              </ScrollView>
            </>)}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundColor,
  },
  content: {
    padding: 12,
  },
  loadingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
    fontWeight: 'bold',
  },
  errorText: {
    color: colors.textError, 
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default App;

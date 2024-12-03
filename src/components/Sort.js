import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const orderArrows = {
  '1': '↑',
  '-1': '↓',
};

/**
 *
 * @param currentRepos - array of repos from GH endpoint
 * @param onSort - function, accepts newly sorted repos
 *
 */
function Sort({ currentRepos, onSort }) {
  const [currentKey, updateKey] = useState('');
  const [currentOrder, updateOrder] = useState(1);

  function sort(key) {
    const order = currentKey === key ? -1 : 1;

    const sortedRepos = [...currentRepos].sort((a, b) => {
      if (a[key] < b[key]) return -1 * order;
      if (a[key] > b[key]) return 1 * order;
      return 0;
    });

    if (key !== currentKey) {
      updateKey(key);
    }
    updateOrder(order);
    onSort(sortedRepos);
  }

  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <TouchableOpacity
          onPress={() => {
            sort('name');
          }}>
          <Text style={styles.title}>
            {`Name ${currentKey === 'name' ? orderArrows[currentOrder] : ''}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.stars}>
        <TouchableOpacity
          onPress={() => {
            sort('stargazers_count');
          }}>
          <Text style={[styles.title, styles.starsTitle]}>
            {`Stars ${
              currentKey === 'stargazers_count' ? orderArrows[currentOrder] : ''
            }`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    width: '100%',
  },
  stars: {
    flex: 1 / 4,
    paddingRight: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  starsTitle: {
    textAlign: 'right',
  },
  name: {
    flex: 3 / 4,
  },
});

export default Sort;

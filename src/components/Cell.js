import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Modal from 'react-native-modal';
import colors from '../colors';
import Sort from './Sort';

const ICON_SIZE = 20;

/**
 *
 * @param filled - boolean
 */
function Heart({ filled }) {
  return (
    <Icon
      name={filled ? 'favorite' : 'favorite-border'}
      size={20}
      color={colors.iconHeart}
    />
  );
}

function Star() {
  return <Icon name="grade" size={20} color={colors.text2} />;
}

/**
 * @param id - string
 * @param title - string
 * @param owner - string
 * @param stars - number
 * @param timestamp - number
 * @param url - string
 * @param avatar - string
 * @param isFavorite - boolean
 * @param onAddFavorite - function, accepts id of repo to toggle favorite option
 */
function Cell({
  id,
  title,
  owner,
  stars,
  timestamp,
  avatar,
  url,
  isFavorite,
  onAddFavorite,
}) {
  const [modalVisible, updateModalState] = useState(false);

  /**
   *
   * @param date - number/Date
   */
  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  /**
   *
   * @param modalVisible - boolean, true if modal visible, false otherwise
   */
  function toggleModal(modalVisible) {
    updateModalState(modalVisible);
  }

  async function goToGitHub() {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  }

  return (
    <>
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            testID={`cell-${id}-favorite-button`}
            activeOpacity={0.8}
            onPress={() => onAddFavorite(id)}>
            <View style={styles.heartContainer}>
              <Heart filled={isFavorite} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID={`cell-${id}-details-button`}
            activeOpacity={0.8}
            onPress={() => toggleModal(true)}
            style={styles.infoContainer}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View style={styles.repoOwnership}>
              <Text>{`${owner}/${title}`}</Text>
            </View>

            <View style={styles.starsContainer}>
              <Text>{stars}</Text>
              <Star />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        onBackButtonPress={() => toggleModal(false)}
        onBackdropPress={() => toggleModal(false)}
        isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <Image
            style={[styles.avatar, styles.avatarLarge]}
            source={{ uri: avatar }}
          />

          <View style={styles.modalInfoBlock}>
            <Text style={styles.modalBlockTitle}>Title:</Text>
            <Text style={styles.modalBlockContent}>{title}</Text>
          </View>
          <View style={styles.modalInfoBlock}>
            <Text style={styles.modalBlockTitle}>Owner:</Text>
            <Text style={styles.modalBlockContent}>{owner}</Text>
          </View>
          <View style={styles.modalInfoBlock}>
            <Text style={styles.modalBlockTitle}>ID:</Text>
            <Text style={styles.modalBlockContent}>{id}</Text>
          </View>
          <View style={styles.modalInfoBlock}>
            <Text style={styles.modalBlockTitle}>Created at:</Text>
            <Text style={styles.modalBlockContent}>
              {formatDate(timestamp)}
            </Text>
          </View>
          <View style={styles.modalInfoBlock}>
            <Text style={styles.modalBlockTitle}>
              <Star />
            </Text>
            <Text style={styles.modalBlockContent}>{stars}️</Text>
          </View>

          <TouchableOpacity onPress={goToGitHub}>
            <View style={styles.modalBlockLink}>
              <Text style={styles.urlText}>Visit repo on GitHub</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentGrey,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  repoOwnership: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  urlText: {
    color: colors.accent2,
    fontSize: 18,
  },
  modalContent: {
    padding: 12,
    backgroundColor: colors.backgroundColor,
  },
  modalInfoBlock: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
  modalBlockTitle: {
    fontWeight: '700',
    color: colors.text1,
    fontSize: 16,
    flex: 1 / 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalBlockContent: {
    color: colors.text2,
    marginLeft: 12,
    fontSize: 16,
    flex: 1 / 2,
  },
  modalBlockLink: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    color: '#333',
  },
  heartContainer: {
    marginRight: 10,
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 6,
    resizeMode: 'contain',
  },

  avatarLarge: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    margin: 4,
  },
});

export default Cell;

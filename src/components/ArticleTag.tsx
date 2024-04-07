import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/Colors';

const reviewColor = '#38BDF8';

type ArticleTagProps = {
  type: string;
};

const ArticleTag = ({ type }: ArticleTagProps) => {
  switch (type) {
    case 'general':
      return (
        <View style={styles.tagContainer}>
          <View style={styles.container}>
            <View style={styles.general}></View>
            <Text>General</Text>
          </View>
        </View>
      );
    case 'review':
      return (
        <View style={styles.tagContainer}>
          <View style={styles.container}>
            <View style={styles.review}></View>
            <Text>Review</Text>
          </View>
        </View>
      );
    case 'live report':
      return (
        <View style={styles.tagContainer}>
          <View style={styles.container}>
            <View style={styles.liveReport}></View>
            <Text>Live Report</Text>
          </View>
        </View>
      );
    case 'playlist':
      return (
        <View style={styles.tagContainer}>
          <View style={styles.container}>
            <View style={styles.playlist}></View>
            <Text>Playlist</Text>
          </View>
        </View>
      );
    default:
      return (
        <View style={styles.tagContainer}>
          <View style={styles.container}>
            <View style={styles.tag}></View>
            <Text>{type}</Text>
          </View>
        </View>
      );
  }
};

export default ArticleTag;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
    height: 32,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  general: {
    backgroundColor: COLORS.neutral300,
    width: 10,
    height: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  generalText: {},
  review: {
    backgroundColor: reviewColor,
    width: 10,
    height: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  liveReport: {
    backgroundColor: 'orange',
    width: 10,
    height: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  playlist: {
    backgroundColor: 'pink',
    width: 10,
    height: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  tag: {
    backgroundColor: COLORS.neutral300,
    width: 10,
    height: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
});

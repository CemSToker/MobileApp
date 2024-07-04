import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import fetchAccountImages from '../fetchImage';


const ImageTest = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const imgs = await fetchAccountImages();
      setImages(imgs);
    };

    getImages();
  }, []);

  const renderImage = ({ item }) => (
    <FastImage
      style={styles.image}
      source={{
        uri: item.link,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default ImageTest;

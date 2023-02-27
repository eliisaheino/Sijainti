import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import MapView, { Marker, pinColor, pin } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
 
  const [location, setLocation] = useState(null); // State where location is saved
  const [pin, setPin] = useState({
    latitude: 60.200692,
    longitude: 24.934302,

  });

  useEffect(() => (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLocation(location);
      console.log('Location:', location)

    setPin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
  });

    })(), []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange" , e.nativeEvent);
        }}
      >
        <Marker
          coordinate={pin}
          pinColor='gold'
          title='You are here'
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

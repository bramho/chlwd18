import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';

import MapView from 'react-native-maps';
import PanController from './PanController';
import PriceMarker from './AnimatedPriceMarker';

import { getTranslation, setLocale } from '../helpers/Translations.js';

import { General} from '../assets/styles/General';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 53.2002316;
const LONGITUDE = 5.6784219;
const LATITUDE_DELTA = 1.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);

function getMarkerState(panX, panY, scrollY, i) {
  const xLeft = (-SNAP_WIDTH * i) + (SNAP_WIDTH / 2);
  const xRight = (-SNAP_WIDTH * i) - (SNAP_WIDTH / 2);
  const xPos = -SNAP_WIDTH * i;

  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const isNotIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const center = panX.interpolate({
    inputRange: [xPos - 10, xPos, xPos + 10],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const selected = panX.interpolate({
    inputRange: [xRight, xPos, xLeft],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const translateY = Animated.multiply(isIndex, panY);

  const translateX = panX;

  const anim = Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  }));

  const scale = Animated.add(ONE, Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, SCALE_END - 1],
    extrapolate: 'clamp',
  })));

  // [0 => 1]
  let opacity = scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // if i === index: [0 => 0]
  // if i !== index: [0 => 1]
  opacity = Animated.multiply(isNotIndex, opacity);


  // if i === index: [1 => 1]
  // if i !== index: [1 => 0]
  opacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  let markerOpacity = scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const markerScale = selected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return {
    translateY,
    translateX,
    scale,
    opacity,
    anim,
    center,
    selected,
    markerOpacity,
    markerScale,
  };
}
export default class Maps extends Component {
   constructor(props) {
      super(props);

      const panX = new Animated.Value(0);
      const panY = new Animated.Value(0);

      const scrollY = panY.interpolate({
        inputRange: [-1, 1],
        outputRange: [1, -1],
      });

      const scrollX = panX.interpolate({
        inputRange: [-1, 1],
        outputRange: [1, -1],
      });

      const scale = scrollY.interpolate({
        inputRange: [0, BREAKPOINT1],
        outputRange: [1, 1.6],
        extrapolate: 'clamp',
      });

      const translateY = scrollY.interpolate({
        inputRange: [0, BREAKPOINT1],
        outputRange: [0, -100],
        extrapolate: 'clamp',
      });

      const markers = [
        {
          id: 0,
          amount: 99,
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          id: 1,
          amount: 199,
          coordinate: {
            latitude: LATITUDE + 0.004,
            longitude: LONGITUDE - 0.004,
          },
        },
        {
          id: 2,
          amount: 285,
          coordinate: {
            latitude: LATITUDE - 0.004,
            longitude: LONGITUDE - 0.004,
          },
        },
      ];

      const animations = markers.map((m, i) =>
        getMarkerState(panX, panY, scrollY, i));

      this.state = {
        panX,
        panY,
        animations,
        index: 0,
        canMoveHorizontal: true,
        scrollY,
        scrollX,
        scale,
        translateY,
        markers,
        region: new MapView.AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      };
    }

    componentDidMount() {
      const { region, panX, panY, scrollX, markers } = this.state;

      panX.addListener(this.onPanXChange);
      panY.addListener(this.onPanYChange);

      region.stopAnimation();
      region.timing({
        latitude: scrollX.interpolate({
          inputRange: markers.map((m, i) => i * SNAP_WIDTH),
          outputRange: markers.map(m => m.coordinate.latitude),
        }),
        longitude: scrollX.interpolate({
          inputRange: markers.map((m, i) => i * SNAP_WIDTH),
          outputRange: markers.map(m => m.coordinate.longitude),
        }),
        duration: 0,
      }).start();
    }

    onStartShouldSetPanResponder = (e) => {
      // we only want to move the view if they are starting the gesture on top
      // of the view, so this calculates that and returns true if so. If we return
      // false, the gesture should get passed to the map view appropriately.
      const { panY } = this.state;
      const { pageY } = e.nativeEvent;
      const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
      const topOfTap = screen.height - pageY;

      return topOfTap < topOfMainWindow;
    }

    onMoveShouldSetPanResponder = (e) => {
      const { panY } = this.state;
      const { pageY } = e.nativeEvent;
      const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
      const topOfTap = screen.height - pageY;

      return topOfTap < topOfMainWindow;
    }

    onPanXChange = ({ value }) => {
      const { index } = this.state;
      const newIndex = Math.floor(((-1 * value) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);
      if (index !== newIndex) {
        this.setState({ index: newIndex });
      }
    }

    onPanYChange = ({ value }) => {
      const { canMoveHorizontal, region, scrollY, scrollX, markers, index } = this.state;
      const shouldBeMovable = Math.abs(value) < 2;
      if (shouldBeMovable !== canMoveHorizontal) {
        this.setState({ canMoveHorizontal: shouldBeMovable });
        if (!shouldBeMovable) {
          const { coordinate } = markers[index];
          region.stopAnimation();
          region.timing({
            latitude: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [
                coordinate.latitude,
                coordinate.latitude - (LATITUDE_DELTA * 0.5 * 0.375),
              ],
              extrapolate: 'clamp',
            }),
            latitudeDelta: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
              extrapolate: 'clamp',
            }),
            longitudeDelta: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
              extrapolate: 'clamp',
            }),
            duration: 0,
          }).start();
        } else {
          region.stopAnimation();
          region.timing({
            latitude: scrollX.interpolate({
              inputRange: markers.map((m, i) => i * SNAP_WIDTH),
              outputRange: markers.map(m => m.coordinate.latitude),
            }),
            longitude: scrollX.interpolate({
              inputRange: markers.map((m, i) => i * SNAP_WIDTH),
              outputRange: markers.map(m => m.coordinate.longitude),
            }),
            duration: 0,
          }).start();
        }
      }
    }

    onRegionChange(region, lastLat, lastLong) {
      this.setState({
        region: region,
        // If there are no new values set the current ones
        lastLat: lastLat || this.state.lastLat,
        lastLong: lastLong || this.state.lastLong
      });
    }
    fetchData() {
      Api.getData(apiLink)
        .then((data) => {
            listData = data.results;

            this.setState({
               dataSource: this.state.dataSource.cloneWithRows(data.results),
               apiData: data.results,
               isLoading: false,
               empty: false,
               rawData: data.results,
            });

            setStorageData(storageKey, listData);


        })
        .catch((error) => {
            console.log(error)
            this.setState({
               empty: true,
               isLoading: false,
            });
        });
   }
      componentDidMount() {
         this.watchID = navigator.geolocation.watchPosition((position) => {
           // Create the object to update this.state.mapRegion through the onRegionChange function
           let region = {
             latitude:       position.coords.latitude,
             longitude:      position.coords.longitude,
             latitudeDelta:  0.00922*50.5,
             longitudeDelta: 0.00421*50.5
           }
           this.onRegionChange(region, region.latitude, region.longitude);
         });

     }
    render() {
      const {
        panX,
        panY,
        animations,
        canMoveHorizontal,
        markers,
        region,
      } = this.state;

      return (
        <View style={styles.container}>
          <PanController
            style={styles.container}
            vertical
            horizontal={canMoveHorizontal}

            snapSpacingX={SNAP_WIDTH}
            yBounds={[-1 * screen.height, 0]}
            xBounds={[-screen.width * (markers.length - 1), 0]}
            panY={panY}
            panX={panX}
            onStartShouldSetPanResponder={this.onStartShouldSetPanResponder}
            onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder}
          >
            <MapView.Animated
              provider={this.props.provider}
              style={styles.map}
              region={region}
              showsUserLocation={true}
              followUserLocation={true}
            onRegionChange={this.onRegionChange.bind(this)}
            >
              {markers.map((marker, i) => {
                const {
                  selected,
                  markerOpacity,
                  markerScale,
                } = animations[i];

                return (
                  <MapView.Marker
                    key={marker.id}
                    coordinate={marker.coordinate}
                  >
                    <PriceMarker
                      style={{
                        opacity: markerOpacity,
                        transform: [
                          { scale: markerScale },
                        ],
                      }}
                      amount={marker.amount}
                      selected={selected}
                    />
                  </MapView.Marker>
                );
              })}
            </MapView.Animated>

          </PanController>
        </View>
      );
    }
  }

  Maps.propTypes = {
    provider: MapView.ProviderPropType,
  };

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    itemContainer: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
      position: 'absolute',
      height:120,
      // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
      paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
      // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
    },
    map: {
      backgroundColor: 'transparent',
      ...StyleSheet.absoluteFillObject,
    },
    item: {
      width: ITEM_WIDTH,
      height: screen.height + (2 * ITEM_PREVIEW_HEIGHT),
      backgroundColor: 'red',
      marginHorizontal: ITEM_SPACING / 2,
      overflow: 'hidden',
      borderRadius: 3,
      borderColor: '#000',
    },
  });

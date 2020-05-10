import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScanner extends React.Component {
  state = {
    cameraPermitted: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermitted: status === 'granted' });
  }

  handleScan = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { cameraPermitted, scanned } = this.state;
    console.log ("permission for Camera : " + cameraPermitted)

    if (cameraPermitted === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (cameraPermitted === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleScan}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  } 
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }
};

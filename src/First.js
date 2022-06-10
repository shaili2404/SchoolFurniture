import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import constants from "./locales/constants";
import Fonts from './asset/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from './utils/constants';
import axios from 'axios'
import endUrl from './redux/configration/endUrl';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";




const First = () => {
  const navigation = useNavigation();
  const [buttonStatus, setButtonStatus] = useState({})

  const sampleData = [1,2,3,4,5,6,7,8,9];

  const sampleDat = [1,2,3,4,5,6,7];

  useLayoutEffect(() => {
    let title = 'Reports'
    navigation.setOptions({ title });
  }, []);

  const apicall = () => {
    // setLoader(true)
    axios
      .get(`${endUrl.dashboard_getButtonStatus}`)
      .then((res) => {
        setButtonStatus(res?.data?.data)
        // setLoader(false)
      })
      .catch((e) => setLoader(false))
  }

  useEffect(()=> {
     apicall()
  },[])
  return (
  //   <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#fff', 
  // }}>
  //     <Text style={{ textAlign: 'center', fontFamily: Fonts.bold, fontSize: RFValue(18, STANDARD_SCREEN_SIZE)    }}>Reports</Text>
  //   </View>
  <ScrollView>
  <View style={styles.container}>
    <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={{ x: 10, y: 20 }}
  >
    <VictoryBar horizontal
      style={{
        data: { fill: "#c43a31" }
      }}
      data={sampleData}
    />
  </VictoryChart>
  <VictoryPie
  colorScale={["yellow", "skyblue", "gold", "cyan", "navy","red", "pink" ]}
  data={sampleDat}
/>

<View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#FF6700'}]}>
        <Text style={styles.buttonText}>Pending Collections - {buttonStatus.pending_collection}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.flx}>
      <TouchableOpacity style={[styles.button,{backgroundColor: '#C00000'}]}>
        <Text style={styles.buttonText}>Pending Repairs - {buttonStatus.pending_repairs}</Text>
      </TouchableOpacity>
      </View>
      </View>

      <View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#70B345'}]}>
        <Text style={styles.buttonText}>Total Deliveries - {buttonStatus.total_deliveries}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.flx}>
      <TouchableOpacity style={[styles.button,{backgroundColor: '#5B9BD5'}]}>
        <Text style={styles.buttonText}>Pending Replenishments - {buttonStatus.pending_replenishments}</Text>
      </TouchableOpacity>
      </View>
      </View>

      <View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#21417C'}]}>
        <Text style={styles.buttonText}>Pending Deliveries - {buttonStatus.pending_deliveries}</Text>
      </TouchableOpacity>
      </View>
      </View>
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }, 
  buttonView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  flx: {
    flex: 1,
  },
  buttonText: {
    fontSize: 12, 
    color: '#fff',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 41,
    borderRadius: 5,
  },
});

export default First;



import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import endUrl from "../../../redux/configration/endUrl";
import axios from 'axios'
import COLORS from '../../../asset/color';



export const DashboardButton = ()=>{
    const [buttonStatus, setButtonStatus] = useState({})

    const apicall = () => {
        axios
          .get(`${endUrl.dashboard_getButtonStatus}`)
          .then((res) => {
            setButtonStatus(res?.data?.data)
          })
          .catch((e) => setLoader(false))
      }
    
      useEffect(()=> {
         apicall()
      },[])
    return(
    
         <View style={styles.pieViewss}>
        <View style={styles.buttonView}>
            <View style={styles.flx}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FF6700' }]}>
                    <Text style={styles.buttonText}>Pending Collections - {buttonStatus.pending_collection}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flx}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#C00000' }]}>
                    <Text style={styles.buttonText}>Pending Repairs - {buttonStatus.pending_repairs}</Text>
                </TouchableOpacity>
            </View>
        </View><View style={styles.buttonView}>
                <View style={styles.flx}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#70B345' }]}>
                        <Text style={styles.buttonText}>Total Deliveries - {buttonStatus.total_deliveries}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.flx}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#5B9BD5' }]}>
                        <Text style={styles.buttonText}>Pending Replenishments - {buttonStatus.pending_replenishments}</Text>
                    </TouchableOpacity>
                </View>
            </View><View style={styles.buttonView}>
                <View style={styles.flx}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#21417C' }]}>
                        <Text style={styles.buttonText}>Pending Deliveries - {buttonStatus.pending_deliveries}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
    )
}
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
      pieViewss: {
        backgroundColor: COLORS.White,
        alignSelf: "center",
        width: Dimensions.get("window").width,
        height: 250,
        borderRadius: 20,
        marginRight: 10,
        justifyContent:'center'
      },
    })
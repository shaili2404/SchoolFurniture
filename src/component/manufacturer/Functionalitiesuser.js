import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import COLORS from '../../asset/color';
import constants from "../../locales/constants";
import endUrl from "../../redux/configration/endUrl";
import Images from "../../asset/images";
import { Baseurl } from "../../redux/configration/baseurl";
import { Token } from "../../component/dummyData/Token";

const SECTIONNAME = {
    district: "Maintenance - School District",
    user: "System Admin - Manage Users",
    school: "Maintenance - School"
}

const tableHeader = [
    constants.functionalities,
    constants.create,
    constants.read,
    constants.update,
    constants.delete
];


export const Functionalities = (props) => {
    const [section, setSection] = useState({})
    const [permissionData, setPermissionData] = useState([]);

    useEffect(() => {
        getId();
        getOrgPermission();
    }, []);

    // const data = [
    //     { "key": "Furniture Replacment - Collect Furniture item" },
    //     { "key": "Furniture Replacement - Create Collection Request" },
    //     { "key": "Furniture Replacement - Deliver Furniture Items" },
    //     { "key": "Furniture Replacement - Repair/ Replenish Furniture" },
    //     { "key": "Manage Requests" },
    //     { "key": "Reports" },
    //     { "key": "Maintenance - School District" },
    //     { "key": "Maintenance - School" },
    //     { "key": "Maintenance - Stock Categories" },
    //     { "key": "Maintenance - Stock Items" },
    //     { "key": "Maintenance - Load Repaired Stock" },
    //     { "key": "System Admin - Manage Users" }
    // ];


    const getId = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
        axios.get(Baseurl + endUrl.allPermission).then((res) => {
            generateSection(res?.data?.data);
        }).catch((e) =>
            console.log('apicall', e)
        )
    };

    const getOrgPermission = () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
        axios.get(Baseurl + endUrl.organisationPermission).then((res) => {
            setPermissionData(res?.data?.data[2].permissons || []);
        }).catch((e) =>
            console.log('apicall', e)
        )
    };

    const checkPermission = (id) => {
        return permissionData.includes(id);
    }

    const onChangePermission = (id) => {
        const array = [...permissionData];
        setPermissionData(array.includes(id) ? array.filter(d => d !== id) : [...array, id])
    }

    const generateSection = (IDS) => {
        console.log(IDS)
        const results = {};
        IDS.forEach((eachId) => {
            const splitArr = eachId.name.split('-');
            const key = splitArr[0];
            let sectionTitle = SECTIONNAME[key];

            let op = {
                ...eachId,
                permission: false,
            };

            if (results[sectionTitle]) {
                const existingVal = results[sectionTitle];
                results[sectionTitle] = [...existingVal, op];
            } else {
                results[sectionTitle] = [op];
            }
        });
        setSection(results);
    };



    const rendercomponent = () => {
        return (
            Object.keys(section).map((key) =>
                <React.Fragment key={key}>
                    <View style={styles.subView}>
                        <Text style={styles.textStyles}>{key}</Text>
                    </View>
                    < View style={styles.submainView} >
                        <View style={styles.unclickView}>
                        </View>
                        {section[key].map((subSection) =>
                            <TouchableOpacity style={styles.clickView} key={subSection.id} onPress={() => { onChangePermission(subSection.id) }}>
                                {checkPermission(subSection.id) &&
                                    <Image source={Images.rightIcon} style={{ height: 20, width: 20, justifyContent: 'center', alignSelf: 'center' }}></Image>
                                }
                            </TouchableOpacity>
                        )}
                    </View>
                </React.Fragment>
            )
        )
    }

    return (
        <SafeAreaView style={styles.containerView}>
            <Header tableHeader={tableHeader} />
            <ScrollView >{rendercomponent()}</ScrollView>
        </SafeAreaView>
    )
}

export const Header = ({ tableHeader }) => {
    return (
        <SafeAreaView style={styles.firstView}>
            <View style={styles.mainView}>
                {tableHeader.map((header) =>
                    < View key={header} style={header === "Functionalities" ? styles.funcStyle : styles.viewStyle} >
                        <Text style={styles.textStyle}>{header}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    containerView: {
        backgroundColor: COLORS.LightGreen,
        paddingTop: 10
    },
    subView: {
        paddingHorizontal: 10,
        marginTop: 10
    },
    textStyles: {
        fontSize: 13
    },
    clickView: {
        width: '15%',
        height: 50,
        borderWidth: 0.5
    },
    unclickView: {
        width: '40%',
        height: 50,
        borderWidth: 0.5
    },
    submainView: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        marginTop: 20
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "normal",
        color: COLORS.White,
        textAlign: "left",
        textAlignVertical: "center",
    },
    mainView: {
        flexDirection: "row",
    },
    firstView: {
        backgroundColor: COLORS.GreenBox,
        height: 46,
    },
    viewStyle: {
        width: '15%',
        marginTop: 12,
        marginHorizontal: 3,
    },
    funcStyle: {
        width: '35%',
        marginTop: 12,
        marginHorizontal: 4,
    }
})
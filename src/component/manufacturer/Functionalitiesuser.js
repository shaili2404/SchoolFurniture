import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import COLORS from "../../asset/color";
import constants from "../../locales/constants";
import endUrl from "../../redux/configration/endUrl";
import Images from "../../asset/images";
import { Baseurl } from "../../redux/configration/baseurl";
import { Token } from "../../component/dummyData/Token";
import { useRoute } from "@react-navigation/native";
import { AlertMessage } from "../../Alert/alert";
import AlertText from "../../Alert/AlertText";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../component/loader";

const SECTIONNAME = {
    district: "Maintenance - School District",
    user: "System Admin - Manage Users",
    school: "Maintenance - School",
};

const tableHeader = [
    constants.functionalities,
    constants.read,
    constants.create,
    constants.update,
    constants.delete,
];

export const Functionalities = () => {
    const [section, setSection] = useState({});
    const route = useRoute();
    const navigation = useNavigation();
    const { reqData, btnStatus, itemObj } = route.params;
    const [alert, setAlert] = useState(false);
    const [permissions, setPermissions] = useState(new Map());
    const [permissionIds, setPermissionId] = useState([]);
    const [loader, setLoader] = useState(true);
    const [innerRoute, setInnerRoute] = useState(true)

    useEffect(() => {
        getId();
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
        axios
            .get(Baseurl + endUrl.allPermission)
            .then((res) => {
                setLoader(false);
                generateSection(res?.data?.data);
                getOrgPermission(res?.data?.data);
            })
            .catch((e) => {
                console.log("apicall", e)
                setLoader(false);
            });
    };

    const getOrgPermission = (list) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
        axios
            .get(Baseurl + endUrl.organisationPermission)
            .then((res) => {
                const permission = itemObj?.permissions;
                let permissionMap = new Map();
                if (btnStatus == '0') {
                    permission.forEach((input) => {
                        permissionMap.set(input.id, input)
                    })
                } else {
                    const permissionIds = res?.data?.data[(reqData.organization) - 1].permissons || [];
                    setPermissionId(permissionIds);
                    list.forEach((input) => {
                        if (permissionIds.includes(input.id)) {
                            permissionMap.set(input.id, input);
                        }
                    })
                }
                setPermissions(permissionMap);
            })
            .catch((e) => console.log("apicall", e));
    };

    const checkPermission = (id) => {
        return permissions.has(id)
    };

    const onChangePermission = (section) => {
        const updatedPermission = new Map(permissions);
        if (updatedPermission.has(section.id)) {
            updatedPermission.delete(section.id);
        } else {
            updatedPermission.set(section.id, section);
        }
        setPermissions(updatedPermission);
    };

    const checkDisable = (id) => {
        return !permissionIds.includes(id);
    }

    const onPressDone = () => {
        setAlert(false);
        navigation.navigate("Manage User");
    }

    const onPressCancel = () => {
        navigation.navigate("Manage User");
    }

    const generateSection = (IDS) => {
        const results = {};
        IDS.forEach((eachId) => {
            const splitArr = eachId.name.split("-");
            const key = splitArr[0];
            let sectionTitle = SECTIONNAME[key];

            let op = {
                ...eachId
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

    const onSubmitDetails = async () => {
        setLoader(true);
        let arr = Array.from(permissions.values());
        reqData.permission = arr;

        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
        const service =
            btnStatus == "0"
                ? axios.put(`${Baseurl}${endUrl.addUser}/${itemObj.id}`, reqData)
                : axios.post(`${Baseurl}${endUrl.addUser}`, reqData);
        console.log(`${Baseurl}${endUrl.addUser}`, reqData, "Request")
        service
            .then((res) => {
                setLoader(false);
                setAlert(true);
            })
            .catch((e) => {
                setLoader(false);
                console.log("getError", e);
            });
    };

    const rendercomponent = () => {
        return Object.keys(section).map((key) => (
            <React.Fragment key={key}>
                <View style={styles.subView}>
                    <Text style={styles.textStyles}>{key}</Text>
                </View>
                <View style={styles.submainView}>
                    <View style={styles.unclickView}></View>
                    {section[key].map((subSection) => (
                        <TouchableOpacity
                            style={styles.clickView}
                            key={subSection.id}
                            onPress={() => {
                                onChangePermission(subSection);
                            }}
                            disabled={checkDisable(subSection.id)}
                        >
                            {checkPermission(subSection.id) && (
                                <Image
                                    source={Images.rightIcon}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        justifyContent: "center",
                                        alignSelf: "center",
                                    }}
                                ></Image>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </React.Fragment>
        ));
    };

    return loader ? (
        <Loader />
    ) : (
        <SafeAreaView style={styles.containerView}>
            <Header tableHeader={tableHeader} />
            <ScrollView>{rendercomponent()}</ScrollView>
            <View style={styles.lastView}>
                <Text style={styles.cancelText} onPress={onPressCancel}>{constants.cancel}</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={onSubmitDetails}>
                    <Text style={styles.buttonText}>{constants.submit}</Text>
                </TouchableOpacity>
            </View>
            {alert ? (
                <AlertMessage
                    visible={alert}
                    setmodalVisible={(val) => setAlert(val)}
                    mainMessage={
                        btnStatus == "1"
                            ? AlertText.createSuccess
                            : AlertText.updateSuccess
                    }
                    onPressDone={() => onPressDone()}
                    innerRoute={innerRoute}
                />
            ) : null}
        </SafeAreaView>
    );
};

export const Header = ({ tableHeader }) => {
    return (
        <SafeAreaView style={styles.firstView}>
            <View style={styles.mainView}>
                {tableHeader.map((header) => (
                    <View
                        key={header}
                        style={header === "Functionalities" ? styles.funcStyle : styles.viewStyle}
                    >
                        <Text style={styles.textStyle}>{header}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    containerView: {
        backgroundColor: COLORS.LightGreen,
        paddingTop: 10,
        position: 'relative',
        height: height
    },
    subView: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    textStyles: {
        fontSize: 13,
    },
    clickView: {
        width: "15%",
        height: 50,
        borderWidth: 0.5,
    },
    unclickView: {
        width: "40%",
        height: 50,
        borderWidth: 0.5,
    },
    submainView: {
        flexDirection: "row",
        width: Dimensions.get("window").width,
        marginTop: 20,
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
        width: "15%",
        marginTop: 12,
        marginHorizontal: 3,
    },
    funcStyle: {
        width: "35%",
        marginTop: 12,
        marginHorizontal: 4,
    },
    buttonStyle: {
        backgroundColor: COLORS.GreenBox,
        width: "50%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 39,
    },
    lastView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "100%",
        position: "absolute",
        bottom: 90,
        alignSelf: "center",
        alignContent: 'center',
        paddingHorizontal: '15%',
        paddingVertical: '4%',
        backgroundColor: COLORS.White,
        height: 110
    },
    buttonText: {

        color: COLORS.White,
        fontSize: 22,
        fontWeight: "bold"
    },
    cancelText: {

        color: COLORS.blue,
        textDecorationLine: 'underline',
        fontSize: 16,
        marginTop: 25
    }
});
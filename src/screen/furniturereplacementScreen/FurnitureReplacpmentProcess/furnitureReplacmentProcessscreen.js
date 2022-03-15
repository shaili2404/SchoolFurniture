import React, { useEffect, useState } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Images from "../../../asset/images";
import { IconBar } from "./iconbar";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";
import { InputForm } from "./InputForm/InputForm";
import Dummydata from "../../../component/dummyData/dummyData";
import { ListHeader } from "../../../component/school/listHeader";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";

export const FurnitureReplacmentProcess = () => {
  const [data, setData] = useState(Dummydata);
  const [createRequestIcon, setCreateRequestIcon] = useState("");
  const [collectFurItem, setCollectFurItem] = useState("");
  const [repairIcon, setRepairIcon] = useState("");
  const [dilverFurIcon, setDilverFurIcon] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskNameButoon, setTaskNameButton] = useState(false);
  const [taskNameButoonValue, setTaskNameButtonValue] = useState("");
  const [taskListName, setTaskListName] = useState("");
  const [taskListButtonValue, setTaskListButtonValue] = useState("");
  const [taskListButoon, setTaskListButoon] = useState(false);
  const [schoolname, setschoolname] = useState("");
  const [schoolvalue, setschoolvalue] = useState("");
  const [emisnumber, setemisnumber] = useState("");
  const [emisvalue, setemisvalue] = useState("");
  const [stockcollectionName, setStockcollectioName] = useState("");
  const [stockcount, setStockCount] = useState("");

  const route = useRoute();
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );
  const schooldetails = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user
  );
  console.log(route.params);
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const onSchool = () => {
    setCreateRequestIcon(constants.inprogress);
    setTaskName(constants.createRequest);
    setTaskListName(constants.BrokenFurnitureItem);
    setschoolname(constants.schoolName);
    setschoolvalue(schooldetails?.name);
    setemisnumber(constants.emisNumber);
    setemisvalue(schooldetails?.username);
    setStockcollectioName(constants.schoolFullFur);
  };
  const onrequestList = () => {
    setCollectFurItem(constants.inprogress);
    setTaskName(constants.collectFurnitureRequest);
    setTaskNameButton(true);
    setTaskNameButtonValue(constants.Accept);
    setTaskListName(constants.BrokenFurnitureItem);
    setschoolname(constants.schoolName);
    setschoolvalue(route?.params?.school_name);
    setemisnumber(constants.emisNumber);
    setemisvalue(route?.params?.emis);
    setStockcollectioName(constants.schoolFurCount);
    setStockCount(route?.params?.total_broken_items);
  };

  useEffect(() => {
    if (organization == "School") {
      onSchool();
    } else {
      onrequestList();
    }
  }, []);

  const tableKey = ["category_name", "item_name", "count"];
  const tableHeader = [
    constants.FurCategory,
    constants.furItem,
    constants.collectioncount,
  ];
  const renderComponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        permissionId={permissionId}
      />
    );
  };
  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };
  return (
      <SafeAreaView style={styles.mainView}>
        <View style={styles.furView}>
          <Text style={styles.furText}>
            {constants.FurnitureReplacmnetProcess}
          </Text>
        </View>
        <IconBar
          createRequestIcon={createRequestIcon}
          collectFurItem={collectFurItem}
          repairIcon={repairIcon}
          dilverFurIcon={dilverFurIcon}
        />
        <TaskSection
          taskName={taskName}
          taskNameButoon={taskNameButoon}
          taskNameButoonValue={taskNameButoonValue}
        />
        <InputForm
          schoolname={schoolname}
          schoolvalue={schoolvalue}
          emisnumber={emisnumber}
          emisvalue={emisvalue}
          org={organization}
          stockcollectionName={stockcollectionName}
          stockcount={stockcount}
        />

        <TaskSection
          taskName={taskListName}
          taskListButoon={taskListButoon}
          taskNameButoonValue={taskListButtonValue}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponent}
            data={route?.params?.broken_items}
            keyExtractor={(item) => item.id}
            renderItem={renderComponent}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
        <View style={styles.bottomView}>
          <FooterFur />
        </View>
      </SafeAreaView>
  );
};

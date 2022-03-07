import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Styles from './Styles';
import Constants from '../../../../locales/constants';
import { ListHeaderComman } from '../../../../component/manufacturer/ListHeaderComman';

const StockCategory = () => {
    const [stockCategory, setStockCategory] = useState("");
    const [categoryListData, setCategoryListData] = useState([]);
    const [loader, setLoader] = useState(true);
    const tableKey = [
        "name",
        "surname",
        "username",
        "email",
        "organization",
      ];

      const tableHeader = [
        Constants.name,
        Constants.surname,
        Constants.username,
        Constants.emailId,
        Constants.organisation,
        Constants.manage,
      ];

      const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPage: 0,
        startIndex: 0,
        endIndex: 0,
      });

      const HeaderComponent = () => {
        return <ListHeaderComman tableHeader={tableHeader} />;
      };

      const rendercomponent = ({ item }) => {
        return (
          <DataDisplayList
            item={item}
            tableKey={tableKey}
            reloadList={() => reloadList()}
            Url={endUrl.userList}
            onEdit={(item, task) => onEdit(item, task)}
          />
        );
      };

      const initialPagination = (list) => {
        const len = list.length;
        const totalPage = Math.ceil(len / PAGESIZE);
        setPagination({
          currentPage: 1,
          totalPage: totalPage,
          startIndex: 0,
          endIndex: len > PAGESIZE ? PAGESIZE : len,
        });
      };

      const categoryapicall = () => {
        setLoader(true);
        axios
          .get(`${endUrl.userList}`)
          .then((res) => {
            initialPagination(res?.data?.data);
            setCategoryListData(res?.data?.data);
            setLoader(false);
          })
          .catch((e) => {
            setLoader(false)
            console.log("apicall", e)
          })
          ;
      };

    return(
         <View style={Styles.mainView}>
             <TextInput
              placeholder={Constants.StockCategories}
              style={Styles.inputTxtStyle}
              value={stockCategory}
              onChangeText={(txt) => setStockCategory(txt)}
              maxLength={50}
            />
            <View style={Styles.buttonView}>
            <TouchableOpacity style={Styles.buttonStyle}>
                <Text style={Styles.buttonText}>{Constants.add}</Text>
            </TouchableOpacity>
            </View>
            <FlatList 
             ListHeaderComponent={HeaderComponent}
             showsHorizontalScrollIndicator={false}
             keyExtractor={(item) => item.id}
             data={categoryListData.sort((a, b) => a.name.localeCompare(b.name)).slice(pagination.startIndex, pagination.endIndex)}
             renderItem={rendercomponent}
            />
         </View>

    );
};

export default StockCategory;
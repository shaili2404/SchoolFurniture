import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  iconContainer : {
    width: 24,
    height: 24,
    marginRight: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNameContainer: {
    fontSize: 16, 
    color: "#359934", 
  },
  logoView: {
    marginLeft: 10, 
    marginRight: 10,
  },
  logoImg: {
    width: 230, 
    height: 60, 
    resizeMode : 'stretch',
  }, 
  
  menuItemContainer: {
    paddingVertical: 14,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#000',
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userSectionContainer: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#F1F0EE',
  },
  userProfile: {
    width: 70,
    height: 70,
    borderRadius:  35,
    resizeMode : 'stretch'
    
  },
  menuItemContainera: {
    paddingVertical: 14,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#000',
    borderBottomWidth: .5,
    flexDirection: 'row',
    // alignItems: 'center'
  },
  menuItemContainerb: {
    // paddingVertical: 14,
    // marginLeft: 20,
     marginRight: 60,
    // borderBottomColor: '#000',
    // borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemContainerc: {
    paddingVertical: 14,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#000',
    borderBottomWidth: .5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F4F9F4"
  },
});

export default styles;

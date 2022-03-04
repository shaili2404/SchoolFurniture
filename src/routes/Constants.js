import React from 'react';
import {Image} from 'react-native';
import NavigationRouteNames from "./ScreenNames";

const imgPath = require('../assets/Images/Common/');

const USER_ROLE = {
    MANUFACTURER: "manufacturer",
    SCHOOL: "school",
    DOE: "doe",
    SUPERADMIN: "Super-Admin",
  };

  const DRAWER_MENU = {
    manufacturer: 
    [
      {
        name: 'Dashboard',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/space_dashboard_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Search',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/search_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Furniture Replacement',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/published_with_changes_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Manage Request',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/circle_notifications_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Maintenance',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/engineering_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Reports',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/view_list_black_24dp.png'),
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Manage Users',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/group_black_24dp.png'),
        screenName: NavigationRouteNames.manageuserscreen
      },
      {
        name: 'Signout',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/logout_black_24dp.png'),
        screenName: 'logout'
      },
    ],
    school: [
      {
        name: 'Search',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/search_black_24dp.png'),
        screenName: ""
      },
      {
        name: 'Furniture Replacement',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/published_with_changes_black_24dp.png'),
        screenName: ""
      },
      {
        name: 'Reports',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/view_list_black_24dp.png'),
        screenName: ""
      },
      {
        name: 'Signout',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/logout_black_24dp.png'),
        screenName: 'logout'
      },
    ],
    doe: [
      {
        name: 'Reports',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/view_list_black_24dp.png'),
        screenName: ""
      },
      {
        name: 'Signout',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/logout_black_24dp.png'),
        screenName: 'logout'
      },
    ],
    submenu: [
      {
        name: 'Stock',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/inventory_black_24dp.png'),
        screenName: ""
      },
      {
        name: 'School',
        color: '#F7A435',
        iconName: require('../assets/Images/Common/school_black_24dp.png'),
        screenName: NavigationRouteNames.schoolMaintenace
      },
    ],
  };

  export { USER_ROLE, DRAWER_MENU };
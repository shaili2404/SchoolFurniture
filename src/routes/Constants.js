import React from 'react';
import {Image} from 'react-native';
import Images from '../asset/images';
import NavigationRouteNames from "./ScreenNames";


const USER_ROLE = {
    MANUFACTURER: "Furniture Depot", 
    SCHOOL: "School",
    DOE: "Department of Education",
  };

  const DRAWER_MENU = {
    "Furniture Depot":
    [
      {
        name: 'Home',
        color: '#F7A435',
        iconName: Images.homeIcon,
        screenName: NavigationRouteNames.HOME
      },
      {
        name: 'Dashboard',
        color: '#F7A435',
        iconName: Images.space_dashboard_black_24dp,
        screenName: NavigationRouteNames.DASHBOARDMANUFACTURER
      },
      {
        name: 'Search',
        color: '#F7A435',
        iconName: Images.search_black_24dp,
        screenName: NavigationRouteNames.SEARCH
      },
      {
        name: 'Transact',
        color: '#F7A435',
        iconName: Images.published_with_changes_black_24dp,
        screenName: NavigationRouteNames.Furniturereplacment
      },
      {
        name: 'Maintenance',
        color: '#F7A435',
        iconName: Images.engineering_black_24dp,
        screenName: NavigationRouteNames.Second
      },
      {
        name: 'Report',
        color: '#F7A435',
        iconName: Images.view_list_black_24dp,
        screenName: NavigationRouteNames.REPORTS
      },
      {
        name: 'Manage Users',
        color: '#F7A435',
        iconName: Images.group_black_24dp,
        screenName: NavigationRouteNames.manageuserscreen
      },
      {
        name: 'Logout',
        color: '#F7A435',
        iconName: Images.logout_black_24dp,
        screenName: 'logout'
      },
    ],
    School: [
      {
        name: 'Home',
        color: '#F7A435',
        iconName: Images.homeIcon,
        screenName: NavigationRouteNames.HOME
      },
      {
        name: 'Search',
        color: '#F7A435',
        iconName: Images.search_black_24dp,
        screenName: NavigationRouteNames.SEARCH
      },
      {
        name: 'Transact',
        color: '#F7A435',
        iconName: Images.published_with_changes_black_24dp,
        screenName: NavigationRouteNames.Furniturereplacment
      },
      {
        name: 'Manage Request',
        color: '#F7A435',
        iconName: Images.manage_request_icon,
        screenName: NavigationRouteNames.MANAGEREQUESTS
      },
      {
        name: 'Report',
        color: '#F7A435',
        iconName: Images.view_list_black_24dp,
        screenName: NavigationRouteNames.REPORTS
      },
      {
        name: 'Logout',
        color: '#F7A435',
        iconName: Images.logout_black_24dp,
        screenName: 'logout'
      },
    ],
    "Department of Education": [
      {
        name: 'Home',
        color: '#F7A435',
        iconName: Images.homeIcon,
        screenName: NavigationRouteNames.HOME
      },
      {
        name: 'Report',
        color: '#F7A435',
        iconName: Images.view_list_black_24dp,
        screenName: NavigationRouteNames.REPORTS
      },
      {
        name: 'Logout',
        color: '#F7A435',
        iconName: Images.logout_black_24dp,
        screenName: 'logout'
      },
    ],
    submenu: [
      {
        name: "Catalogue",
        color: '#F7A435',
        iconName: Images.inventory_black_24dp,
        screenName: NavigationRouteNames.STOCKMAINTENANCE
      },
      {
        name: 'School',
        color: '#F7A435',
        iconName: Images.school_black_24dp,
        screenName: NavigationRouteNames.schoolMaintenace
      },
    ],
  };

  export { USER_ROLE, DRAWER_MENU };
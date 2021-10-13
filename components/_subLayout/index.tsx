import DashboardLayout from './dashboardL'
import HomeLayout from './homeL'
import ProfileLayout from './profileL'
import SettingLayout from './settingsL'

const SubLayout : any = {
    DashboardLayout,
    HomeLayout,
    ProfileLayout,
    SettingLayout
}

export enum SUB_LAYOUT_ENUM {
    DashboardLayout = 'DashboardLayout',
    HomeLayout = 'HomeLayout',
    ProfileLayout = 'ProfileLayout',
    SettingLayout = 'SettingLayout',
}

export default SubLayout
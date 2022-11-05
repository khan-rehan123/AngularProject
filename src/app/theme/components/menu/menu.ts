import { Menu } from './menu.model';
export const verticalMenuItemsArabic = [
    new Menu(1, 'لوحة القيادة', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستعمل', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 5),
    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(9, 'Business Impact Analysis', '/en-us/bia/list', null, 'card_membership', null, false, 0),

    new Menu(10, 'Recovery Stratigies', null, null, 'event_note', null, false, 0),
    new Menu(11, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(12, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(13, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),

]
export const verticalMenuItemsArabicAdmin = [
    new Menu(1, 'لوحة القيادة', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'المستعمل', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 5),
    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(9, 'Business continuity Analysis', null, null, 'card_membership', null, false, 0),

    new Menu(10, 'Recovery Stratigies', '/en-us/businessStratigies/adminlist', null, 'event_note', null, false, 0),
    new Menu(11, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(12, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(13, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),
    new Menu(14, 'Pending For Approval', '/en-us/bia/adminlist', null, 'card_membership', null, false, 9),
    new Menu(15, 'Approved List', '/en-us/bia/list', null, 'card_membership', null, false, 9),

]
export const horizontalMenuItemsArabic = [
    new Menu(1, 'Dashboard', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'Users', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 5),
    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(9, 'Business Impact Analysis', '/en-us/bia/list', null, 'card_membership', null, false, 0),

    new Menu(10, 'Recovery Stratigies', null, null, 'event_note', null, false, 0),
    new Menu(11, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(12, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(13, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),

]
export const verticalMenuItems = [
    new Menu(1, 'Dashboard', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'Users', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', null, null, 'keyboard', null, true, 5),
    new Menu(20, 'Add New Program', '/en-us/bcmprogram/programadd', null, 'keyboard', null, false, 6),

    new Menu(21, 'All Program List ', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 6),

    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(8, 'Application', null, null, 'list', null, true, 5),
    new Menu(17, 'Add New Application', '/en-us/bcmprogram/addapplication', null, 'list', null, false, 8),
    new Menu(18, 'All Application List', '/en-us/bcmprogram/applicationlist', null, 'list', null, false, 8),

    new Menu(9, 'Business Impact Analysis', null, null, 'card_membership', null, true, 0),
    new Menu(10, 'Business continuity strategy', null, null, 'event_note', null, true, 0),
    new Menu(19, 'Add New ', '/en-us/businessStratigies/add', null, 'card_membership', null, false, 10),

    new Menu(11, 'All List', '/en-us/businessStratigies/list', null, 'card_membership', null, false, 10),
   
    new Menu(12, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(13, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(14, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),
    new Menu(15, 'All List', '/en-us/bia/list', null, 'card_membership', null, false, 9),
]
export const verticalMenuItemsAdmin = [
    new Menu(1, 'Dashboard', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'Users', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', null, null, 'keyboard', null, true, 5),
    new Menu(20, 'All Program List ', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 6),
    new Menu(21, 'Pending For Approval ', '/en-us/bcmprogram/bcmlist', null, 'keyboard', null, false, 6),

    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(8, 'Application', null, null, 'list', null, true, 5),
    new Menu(17, 'All Application List', '/en-us/bcmprogram/applicationlist', null, 'list', null, false, 8),
    new Menu(17, 'Pending For Approval', '/en-us/bcmprogram/applicationlist', null, 'list', null, false, 8),

    new Menu(9, 'Business Impact Analysis', null, null, 'card_membership', null, true, 0),

    new Menu(10, 'Business Continuity Strategy', null, null, 'event_note', null, true, 0),
    new Menu(11, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(12, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(13, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),
    new Menu(14, 'Pending For Approval', '/en-us/businessStratigies/adminlist', null, 'card_membership', null, false, 10),
    new Menu(16, 'Pending For Approval', '/en-us/bia/adminlist', null, 'card_membership', null, false, 9),

    new Menu(15, 'All List', '/en-us/businessStratigies/list', null, 'card_membership', null, false, 10),
    new Menu(15, 'All List', '/en-us/bia/list', null, 'card_membership', null, false, 9),

]

export const horizontalMenuItems = [
    new Menu(1, 'Dashboard', '/en-us/dashboard', null, 'dashboard', null, false, 0),
    new Menu(2, 'Users', '/en-us/users/list', null, 'supervisor_account', null, false, 0),
    new Menu(3, 'Department', '/en-us/department/list', null, 'computer', null, false, 0),
    new Menu(4, 'Organisation', '/en-us/organisation/list', null, 'dashboard', null, false, 0),

    new Menu(5, 'Organisational Details', null, null, 'dashboard', null, true, 0),
    new Menu(6, 'Program', '/en-us/bcmprogram/programlist', null, 'keyboard', null, false, 5),
    new Menu(7, 'Project', '/en-us/bcmprogram/projectlist', null, 'card_membership', null, false, 5),
    new Menu(8, 'Process', '/en-us/bcmprogram/processlist', null, 'list', null, false, 5),
    new Menu(9, 'Business Impact Analysis', '/en-us/bia/list', null, 'card_membership', null, false, 0),

    new Menu(10, 'Business continuity strategy', null, null, 'event_note', null, false, 0),
    new Menu(11, 'BCDR Planning', '/en-us/bcdrplanning/list', null, 'playlist_add_check', null, false, 0),

    new Menu(12, 'Business Continuity Testing', '/en-us/businessTesting/list', null, 'star_half', null, false, 0),
    new Menu(13, 'Incident Management', '/en-us/incidentManagement/list', null, 'star_half', null, false, 0),
    new Menu(14, 'Pending For Approval', '/en-us/bia/adminlist', null, 'card_membership', null, false, 10),
    new Menu(15, 'Approved List', '/en-us/bia/list', null, 'card_membership', null, false, 10),

]
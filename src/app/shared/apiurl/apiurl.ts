
//***************************API URL CONFIGURATION************************************* */
import { environment } from '../../../environments/environment';

const BASE_URL = environment.END_POINT;

export const APIURLS: any = {
    LOGIN: BASE_URL + '/Users/authenticate',
    CHANGEPASSWORD: BASE_URL + 'admin/changePassword',
    ADDBCMPROGRAM: BASE_URL + '/BCMProgram/Create',
    GETUSERLIST: BASE_URL + '/Users/GetAll',
    GETBCMPROGRAMLIST: BASE_URL + '/BCMProgram/GetAll',
    DELETEBCMPROGRAM: BASE_URL + '/BCMProgram/Delete',
    VIEWBCMPROGRSM: BASE_URL + '/BCMProgram',
    UPDATEBCMPROGRAM: BASE_URL + '/BCMProgram/Update',
    //project Api
    AddProject: BASE_URL + '/BCMProject/Create',
    GETProjectList: BASE_URL + '/BCMProject/GetAll',
    DELETEPOJECT: BASE_URL + '/BCMProject/Delete',
    UPDATEBCMProject: BASE_URL + '/BCMProject/Update',
    //Business Impact Analysis Program

    //status List /BCMStatus/GetProgramStatus
    StatusList: BASE_URL + '/BCMStatus/GetProgramStatus',
    BusinessImpactAnalysis: BASE_URL + '/BusinessImpactAnalysis/Create',
    BusinessImpactAnalysisList: BASE_URL + '/BusinessImpactAnalysis/GetAll',
    BusinessImpactAnalysisListFORADMIN: BASE_URL + '/BusinessImpactAnalysis/GetApprovalList',
    BIAAPPROVEREJECT :BASE_URL+'/BusinessImpactAnalysis/BulkUpdate',

    DELETEBIA: BASE_URL + '/BusinessImpactAnalysis/Delete',
    VIEWBIAPROGRSM: BASE_URL + '/BusinessImpactAnalysis',
    UPDATEBIAPROGRAM: BASE_URL + '/BusinessImpactAnalysis/Update',
    //Add BCDR  Program

    ADDBCDRProgram: BASE_URL + '/BCRDPlan/Create',
    ADDBCDRProgramList: BASE_URL + '/BCRDPlan/GetAll',
    DELETEBCDRPROGRAM: BASE_URL + '/BCRDPlan/Delete',
    UPDATEBCDRPROGRAM: BASE_URL + '/BCRDPlan/Update',
    VIEWBCDRPROGRSM: BASE_URL + '/BCRDPlan',

    GETDEPARTMENT: BASE_URL + '/Department/GetAll',
    ADDDEP: BASE_URL + '/Department/Create',
    UPDATEDEP: BASE_URL + '/Department/Update',
    VIEWDEP: BASE_URL + '/Department',
    DELETEDEP: BASE_URL + '/Department/Delete',

    ORGLIST: BASE_URL + '/Organization/GetAll',
    ORGADD: BASE_URL + '/Organization/Create',
    ORGUPDATE: BASE_URL + '/Organization/Update',
    ORGVIEW: BASE_URL + '/Organization',
    ORGDELETE: BASE_URL + '/Organization/Delete',

    USERLIST: BASE_URL + '/Users/GetAll',
    USERADD: BASE_URL + '/Users/Create',
    USERUPDATE: BASE_URL + '/Users/Update',
    USERVIEW: BASE_URL + '/Users',
    USERDELETE: BASE_URL + '/Users/Delete',

    RoleList: BASE_URL + '/Users/GetRoles',

    INCIDENTADD: BASE_URL + '/Incident_Management/Create',
    INCIDENTLIST: BASE_URL + '/Incident_Management/GetAll',
    INCIDENTDELETE: BASE_URL + '/Incident_Management/Delete',
    INCIDENTUPDATE: BASE_URL + '/Incident_Management/Update',
    INCIDENTVIEW: BASE_URL + '/Incident_Management',

    ADDBCMPROCESS: BASE_URL + '/BCMProcess/Create',
    UPDATEBCMPROCESS: BASE_URL + '/BCMProcess/Update',
    LISTBCMPROCESS: BASE_URL + '/BCMProcess/GetAll',
    VIEWBCMPROCESS: BASE_URL + '/BCMProcess',
    DELETEBCMPROCESS: BASE_URL + '/BCMProcess/Delete',

    ADDBCMPROJECT: BASE_URL + '/BCMProject/Create',
    UPDATEBCMPROJECT: BASE_URL + '/BCMProject/Update',
    LISTBCMPROJECT: BASE_URL + '/BCMProject/GetAll',
    VIEWBCMPROJECT: BASE_URL + '/BCMProject/GetProjects',
    DELETEBCMPROJECT: BASE_URL + '/BCMProject/Delete',
    VIEWBCMProjectByID: BASE_URL + '/BCMProject',
    ADDBCMAPPLICATION: BASE_URL + '/BCMApplication/Create',
    LISTBCMAPPLICATION: BASE_URL + '/BCMApplication/GetAll',
    VIEWBCMAPPLICATION: BASE_URL + '/BCMApplication',
    UPDATEBCMAPPLICATION: BASE_URL + '/BCMApplication/Update',
    DELETEBCMAPPLICATION: BASE_URL + '/BCMApplication/Delete',

    LISTBCMPROJECTBYID: BASE_URL + '/BCMProject/GetProjects',
    LISTBCMPROCESSBYID: BASE_URL + '/BCMProcess/GetProcess',
    LISTBCMAPPLICTIONBYID: BASE_URL + '/BCMApplication/GetApplications',

    /////Stratigy Section
    ADDBCMStratigy: BASE_URL + '/RecoveryStrategy/Create', 
    GetStratigyList: BASE_URL + '/RecoveryStrategy/GetAll',
    GetStratigyListForApprove: BASE_URL + '/RecoveryStrategy/GetApprovalList',

    ViewbusinessStratigy: BASE_URL + '/RecoveryStrategy',
    UpdateBCMStratigy: BASE_URL + '/RecoveryStrategy/Update',
    ListRPOTime: BASE_URL + '/BusinessImpactAnalysis/GetMinRPO',
    GETIMPACTPARAMETER :BASE_URL + '/BCMStatus/GetImpactparameter',
    IMPACTOVERTIME : BASE_URL +'/BCMStatus/GetImapctOverTime',
    CRITICAL:BASE_URL+'/BCMStatus/GetImpactStatus',
    GETRPOSTATUD :BASE_URL+'/BCMStatus/GetRPOStatus',

    STATUSAPPROVE :BASE_URL+'/RecoveryStrategy/BulkUpdate'

}; 

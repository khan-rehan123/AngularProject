export class bcmprogramModel {
    bcM_Program_Status: number;
    bcM_Program_Name: string;
    bcM_Program_Description: string;
    bcM_Program_Owner: number;
    bcM_Program_Manager: number;
    bcM_Program_StartDate: Date;
    bcM_Actual_CompletionDate: Date;
    review_Period_Days: number;
    last_Review_Date: Date;
    bcM_Next_Review_Due_Date: Date;
    bcM_Program_Region: string;
    created_By: number;
    created_Date: Date;
}

export class bcmProjectModel {

    BCM_Program_ID: number;
    BCM_Project_Name: any;
    BCM_Project_Status: number;
    BCM_Project_Description: any;
    Project_Owner: string;
    Project_Cordinator: number;
    Region: string;
    Created_By: number;
    created_Date: Date;
    ID: number


}

export class bcmProjectModelupdate {
    ID: number;
    BCM_Program_ID: number;
    BCM_Project_Name: any;
    BCM_Project_Status: number;
    BCM_Project_Description: any;
    Project_Owner: string;
    Project_Cordinator: number;
    Region: string;
    Created_By: number;
    created_Date: Date;

}
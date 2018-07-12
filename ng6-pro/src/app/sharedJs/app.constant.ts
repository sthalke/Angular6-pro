const url = 'http://103.76.253.131';
const port = ':8082/API';

// const url = 'http://209.58.169.136';
// const port = ':81/API';

// const url = 'https://jadapp.oceanmanager.com';
// const port = '/API';


export const ApiUrl = {
    login: url + port + '/login',
    signUp: url + port + '/api/TechnicalM/Register',
    dashboard: url + port + '/api/TechnicalM/ManagerDashboard',
    logout: url + port + '/api/TechnicalM/logout',
    countryList: url + port + '/api/Country',
    forgotPassword: url + port + '/api/TechnicalM/ForgotPassword',
    timezoneUrl: url + port + '/api/TimeZone',
    changePasswordUrl: url + port + '/api/TechnicalM/ChangePassword',
    checkStatusUrl: url + port + '/api/Checkstatus ',
    getTMList: url + port + '/api/GetAllTM',
    getTMListDetail: url + port + '/api/GetTMDetail',
    aprovedTM: url + port + '/api/TechnicalM/Activate',
    searchData: url + port + '/api/searchtm',
    verifyTM: url + port + '/api/VerifyTM',
    approvalContent: url + port + '/api/ApprovalContent',
    getAllTMList: url + port + '/api/GetAllUser'
};

export const PATTERNS = {
    emailPattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    passwordPattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}',
    numberPattern: '^[0–9]$',
    spacePattern: '/^\S*/',
    phoneNoPattern: '^((\\+91-?)|0)?[0-9]{18}$'
};

// local
export const SiteKey = '6Ldw1GAUAAAAAFz51toJfEcm9WkMVAaOUw02rMOv';
// Production
// export const SiteKey = '6LcywGAUAAAAAL0NgQBJLxUtRgB_7JY04pkx_oTw';


export function AppUrl() {
    return url + port;
}

export const ErrorMessages = {
    COMPANY_NAME_REQUIRED: 'Company Name is required',
    COMPANY_ID_REQUIRED: 'Company Id is required',
    FIRST_NAME_REQUIRED: 'First Name is required',
    LAST_NAME_REQUIRED: 'Last Name is required',
    VALID_EMAIL: 'Please enter a valid email address',
    EMAIL_REQUIRED: 'Email Name is required',
    CONTACT_NO_REQUIRED: 'Contact No is required',
    ADDRESS1_REQUIRED: 'Address1 is required',
    CITY_REQUIRED: 'City is required',
    STATE_REQUIRED: 'County/State is required',
    POSTAL_CODE_REQUIRED: 'Postal/Zip Code is required',
    COUNTRY_REQUIRED: 'Country is required',
    VESSELS_REQUIRED: 'Vessel Name is required',
    IMO_REQUIRED: 'IMO Number is required',
};

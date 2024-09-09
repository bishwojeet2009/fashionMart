import { createAction, props } from "@ngrx/store";
import { User, UserInfo } from "../../interface/user";

const ADDUSER = 'AddUser'
const DELETEUSER = 'DeteleUser'
const ADDUSERInfo = 'AddUser'
const DELETEUSERInfo = 'DeteleUser'


export const addUserAction = createAction(
    ADDUSER,
    props<{ user: User }>()
)

export const deteleUserAction = createAction(DELETEUSER)

export const addUserInfoAction = createAction(
    ADDUSERInfo,
    props<{ userInfo: UserInfo }>()
)

export const deteleUserInfoAction = createAction(DELETEUSERInfo)
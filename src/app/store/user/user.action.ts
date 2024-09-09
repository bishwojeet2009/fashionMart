import { createAction, props } from "@ngrx/store";
import { User } from "../../interface/user";

const ADDUSER = 'AddUser'
const DELETEUSER = 'DeteleUser'


export const addUserAction = createAction(
    ADDUSER,
    props<{ user: User }>()
)

export const deteleUserAction = createAction(DELETEUSER)
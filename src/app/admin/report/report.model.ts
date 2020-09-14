import { UserList } from './userlist.model';

export class Report {
    public userlist:UserList[];

    constructor(userlist:UserList[]) {
        this.userlist = userlist;
    }
}
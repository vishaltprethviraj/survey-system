import { AuditList } from '../audit-log/audit-list.model';

export class AuditLog {
    public auditlist: AuditList[]
     
    constructor(auditList:AuditList[]) {
        this.auditlist = auditList;
    }
}
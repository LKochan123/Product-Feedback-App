import { Component, OnInit, Inject } from "@angular/core";
import { UserRoleEnum } from "src/app/models/enums/user-role";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
    selector: 'app-role-dialog',
    templateUrl: 'role-dialog.component.html'
})
export class RoleDialogComponent implements OnInit { 

    futureRole!: UserRoleEnum;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { 
        username: string, currentRole: UserRoleEnum, id: string 
    }, private authService: AuthService) { }

    ngOnInit() {
        this.futureRole = this.getFutureRole(this.data.currentRole);
    }

    onChangeRole(id: string, role: UserRoleEnum) {
        this.authService.changeUserRole(id, role);
    }

    getFutureRole(role: UserRoleEnum) {
        return role === UserRoleEnum.USER ? UserRoleEnum.MODERATOR : UserRoleEnum.USER;
    }
}
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, combineLatest, map } from "rxjs";
import { UserRoleEnum } from "src/app/models/enums/user-role";
import { UserStatusEnum } from "src/app/models/enums/user-status";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-admin-roles',
    templateUrl: 'admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit, OnDestroy {
    currUsers$!: Observable<User[]>;
    selectedOption: 'users' | 'mods' = 'users';

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
    }

    onlyUsers(status: UserStatusEnum, role: UserRoleEnum) { 
        return this.authService.getUsersByStatus(status, role).pipe(
            map(res => res.users)
        )
    }
    
    checkCurrentRole() {
        return this.selectedOption === 'users' ? UserRoleEnum.USER : UserRoleEnum.MODERATOR;
    }

    onCurrRadioVal() {
        this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
    }

    onChangeRole(currentRole: UserRoleEnum) {
        // TO DO!
    }

    ngOnDestroy() {

    }
}
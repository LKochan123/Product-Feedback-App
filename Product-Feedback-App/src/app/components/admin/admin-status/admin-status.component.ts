import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";
import { Observable } from "rxjs";
import { ActivatedRoute, Data } from "@angular/router";
import { UserStatusEnum } from "src/app/models/enums/user-status";
import { UserRoleEnum } from "src/app/models/enums/user-role";

@Component({
    selector: 'app-admin-status',
    templateUrl: 'admin-status.component.html'
})
export class AdminStatusComponent implements OnInit {

    users$!: Observable<{users: User[], occurance: number}>;
    section!: UserStatusEnum;
    searchData = '';

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        console.log(this.searchData);
        this.route.data.subscribe((data: Data) => {
            const section = data['section'];
            if (section) {
                this.section = section;
                this.loadUsersByStatus(this.section)
            }
        })
    }

    loadUsersByStatus(status: UserStatusEnum) {
        this.users$ = this.authService.getUsersByStatus(status, UserRoleEnum.USER);
    }

    onChangeStatus(id: string, currStatus: UserStatusEnum) {
        this.authService.changeUserStatus(id, currStatus);
    }
}
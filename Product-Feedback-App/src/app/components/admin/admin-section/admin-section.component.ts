import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";
import { Observable, map } from "rxjs";
import { ActivatedRoute, Data, ParamMap, Params, Router } from "@angular/router";
import { UserStatusEnum } from "src/app/models/enums/user-status";

@Component({
    selector: 'app-admin-section',
    templateUrl: 'admin-section.component.html'
})
export class AdminSectionComponent implements OnInit {

    users$!: Observable<{users: User[], occurance: number}>;
    section!: UserStatusEnum;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.route.firstChild?.data.subscribe((data: Data) => {
            const section = data['section'];
            if (section === 'moderators') {
                this.loadModerators();
            } else {
                this.section = section;
                this.loadUsersByStatus(this.section)
            }
        })
    }

    loadUsersByStatus(status: UserStatusEnum) {
        this.users$ = this.authService.getUsersByStatus(status).pipe(
            map(res => ({ users: res.users, occurance: res.occurance }))
        );
    }

    loadModerators() {

    }

    onBanUser(id: string) {
        this.authService.banUser(id);
    }

    onUnbanUser(id: string) {
        this.authService.unbanUser(id);
    }
}
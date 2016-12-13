import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { APIService } from './../../shared/api.service';
import { User, UpdateUserPasswordPayload } from './../model';

@Injectable()
export class UserService {

    constructor(private api: APIService) { }

    getUserSelf(): Observable<User> {
        let request = this.api.request({
            uri: `/users/self`,
            method: 'GET',
        })
            .map(res => {
                let user = res.payload;
                if (!user) {
                    throw new Error("no user in response");
                }
                return user;
            }).share();

        return request;
    }

    updatePassword(payload: UpdateUserPasswordPayload): Observable<User> {
        let request = this.api.request({
            uri: `/users/self/password`,
            method: 'PATCH',
            body: JSON.stringify(payload),
        })
            .map(res => {
                let user = res.payload;
                if (!user) {
                    throw new Error("no user in response");
                }
                return user;
            }).share();

        return request;
    }
}
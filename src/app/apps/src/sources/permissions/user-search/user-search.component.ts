import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { User, UserProfileService } from 'toco-lib';

@Component({
  selector: 'catalog-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  userCtrl = new UntypedFormControl();
  filteredUser = new Array<User>();

  // @Input()
  // userFilter: { type: string, value: string};

  @Output()
  selectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserProfileService) { }

  ngOnInit() {
    // if (this.userFilter != undefined) {
    //   this.params = this.params.set(this.userFilter.type, this.userFilter.value);
    // }
    this.userCtrl.valueChanges
    .subscribe({
      next: (userValueChanges) => {
        // this condition check if the param is a `string` an if at least write 3 letters
        if (typeof userValueChanges === 'string' && userValueChanges.length >= 3) {
          // this.params = this.params.set('q', userValueChanges)
          this.userService.getUsers(10, 1, userValueChanges).subscribe({
              next: (response) => {
                console.log(response.data.users);
                this.filteredUser = response.data.users;
              }
          });
        } else if (typeof userValueChanges === 'object') {
          //console.log("org selected: ", userValueChanges);
          this.selectedUser.emit(userValueChanges);
        }

      }

    })
  }

  displayFn(user?: User): string | undefined {
    return user ? user.email : undefined;
  }

}

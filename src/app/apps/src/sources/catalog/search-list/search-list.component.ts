
import { Component, Input, OnInit } from '@angular/core';
// import { OAuthStorage } from 'angular-oauth2-oidc';
import { HitList, Source } from 'toco-lib';

@Component({
	selector: 'search-list',
	templateUrl: './search-list.component.html',
	styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit
{

	@Input()
	public hitList: HitList<Source>;


    public constructor()
	{ }

	public ngOnInit(): void
	{

	}
	/**
	* hasPermission return true if the user have permission
	*/
	// public get hasPermission(): boolean {
	// 	let permission = new Permission();

	// 	if (permission.hasPermissions("curator")|| permission.hasPermissions("admin")) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}

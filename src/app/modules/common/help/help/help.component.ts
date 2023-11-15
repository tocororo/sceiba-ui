
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


export interface HelpDoc {
  title: string;
  path: string;
}


@Component({
  selector: 'sceiba-ui-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit
{

  docsList: HelpDoc[] = [];
  public constructor(private activatedRoute: ActivatedRoute,)
  { }

  public ngOnInit(): void
  {
    // this.activatedRoute.children.forEach(route => {
    //   this.docsList.push({
    //     title:
    //     'path'
    //   })
    // });
  //   this.activatedRoute.data.subscribe({
  //     next: (data: { docs: HelpDoc[] }) => {
  //         if (data)
  //         {
  //            this.docsList = data.docs;
  //         }

  //     },
  //     error: (e: any) => { console.log(e); },
  //     complete: () => { }
  // });
  }
}


import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { timer } from 'rxjs';
import { Environment, MetadataService, getPathWithLangExtension } from 'toco-lib';
import { HeaderService } from "../header.service";


@Component({
  selector: "sceiba-ui-app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class SceibaUiHomeComponent implements OnInit {

  public documentTotal: number = 0;
  public cubanOrganizationTotal: number = 0;

  public homeCharts = {
    type: [],
    total: []
  }
  loadCharts = false;

  slideIndex = 1;
  public env;

  public constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _transServ: TranslateService,
    private metadata: MetadataService,
    private _env: Environment,
    private headerService: HeaderService)
  { }

  public ngOnInit(): void {
    this.env = this._env;
    this._activatedRoute.url.subscribe( () =>{
    this.metadata.setStandardMeta("Sceiba - Portal de Publicaciones Científicas Cubanas","Plataforma para el monitoreo de publicaciones científicas cubanas", "/assets/images/sceiba-logo.png");
    this.metadata.meta.updateTag({name:"keywords", content:"evaluación, revista científica, calidad, metodología, publicación científica, investigación, Cuba"});
    })

    // this._searchService.getRecords(null).subscribe({
    //   next: (searchResponse: SearchResponse<Record>) => {

    //     console.log(searchResponse);

    //     this.documentTotal = searchResponse.hits.total;

    //     searchResponse.aggregations['sources'].buckets.forEach(element => {
    //       if (!element.key.localeCompare("Cuba"))
    //         this.cubanOrganizationTotal = element.doc_count;
    //     });

    //     searchResponse.aggregations['keywords'].buckets.forEach(element => {
    //       this.homeCharts.type.push({ name: element.key, value: element.doc_count })
    //     });
    //     this.homeCharts.total = [
    //       { name: "Documentos", value: searchResponse.hits.total },
    //       // {name: "Cubanas", value: this.cubanOrganizationTotal}
    //     ]
    //     this.loadCharts = true;
    //   }
    // });

    this.showSlides(this.slideIndex);
    timer(10000, 10000).subscribe(x => {
      if (this.slideIndex > 4){
        this.slideIndex = 1
      }
      this.slideIndex += 1;
      this.showSlides(this.slideIndex);
    });

    let data = {
      icon: '/assets/icons/apps/discover.svg',
      iconLabel: 'BUSQUEDA',
      iconAlt: 'BUSQUEDA',
      iconRoute: this.env.discover,
      secondaryMenuElements: null,
      extraMenuAuthenticatedUser: null,
    };
    this.headerService.setHeaderData(data);
  }


  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number) {
    // var i;
    // var slides = document.getElementsByClassName("mySlides")
    // var dots = document.getElementsByClassName("dot");

    // if (n > slides.length) {
    //   this.slideIndex = 1
    // }
    // if (n < 1) {
    //   this.slideIndex = slides.length
    // }
    // for (i = 0; i < slides.length; i++) {
    //   slides[i].setAttribute("style", "display: none;");
    // }
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
    // slides.item(this.slideIndex - 1).setAttribute("style", "display: block;");
    // dots.item(this.slideIndex - 1).className += " active";
  }

  public getPath(path: string): string
  {
    return getPathWithLangExtension(path, this._transServ.currentLang);
  }
}

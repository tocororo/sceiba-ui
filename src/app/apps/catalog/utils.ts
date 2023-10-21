import { Environment, OrganizationServiceNoAuth } from "toco-lib";


export class Utils{

  public static getTopOrganization(orgService: OrganizationServiceNoAuth, environment: Environment){
    if (localStorage.getItem('topMainOrganization') && localStorage.getItem('topMainOrganization') != '') {
      const response = JSON.parse(localStorage.getItem('topMainOrganization'));
      return response;

    } else {
      if (environment.topOrganizationPID) {
        orgService
          .getOrganizationByPID(environment.topOrganizationPID)
          .subscribe(
            (response) => {
              return response;
              // this.topMainOrganization.deepcopy(response.metadata);
            },
            (error) => {
              console.log("error");
            },
            () => { }
          );
      }
    }
    return null;
  }
}

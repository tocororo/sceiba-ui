import { Entity, Role } from "toco-lib";

class Title {
  title: string;
  titleType: string;
  lang: string;
}

class Creator {
  creatorName: string;
  familyName: string;
  givenName: string;
}

class RelatedIdentifier {
  idtype: string;
  idvalue: string;
}
class Contributor {
  contributorName: string;
  contributorType: string;
  familyName: string;
}

class FundingReference {
  awardNumber: string;
  awardURI: string;
  founderName: string;
}
export class Project extends Entity {
  /****************************************************
   * `id` and `identifiers` are extended from `Entity`
   ****************************************************/

  /**
   * Person gender
   */
  title: Title[];

  /**
   * Profile of the people in Sceiba, the details
   */
  creator: Creator[];

  contributor: Contributor[];

  fundingReference: FundingReference[];

  publishDate: {
    dateType: string;
    dateValue: string;
  };

  lenguaje: string[];

  publisher: string[];

  relatedIdentifier: RelatedIdentifier[];
  /************************************* More Data ******************************/
}

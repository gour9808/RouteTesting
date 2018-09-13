import {licenseCategoryType} from './licenseCategoryType';

export class licenseInfo{
    firstName: string;
	lastName: string;
	dateOfBirth: Date;
	placeOfBirth : string;
	dateOfIssue: Date;
	dateOfExpiry: Date;
	issuingAuthority: string;
	licenseNumber: string;
	licenseCategory : licenseCategoryType[];
	licensePictureUrl: string;
    addressInfo : string;
}


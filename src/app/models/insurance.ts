export module Insurance {

    class Serializable {
        fillFromJSON(json: any) {
            var jsonObj = json;
            for (var propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] == 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName]
                this[propName] = jsonObj[propName]
            }
        }
    }

    export class InsuredVehicle {
        motor: Motor
        trailer: Trailer
        constructor() {
            this.motor = new Motor();
            this.trailer = new Trailer();
        }
    }

    export class Motor {
        make: String
        type: String
        registrationNumber: String
        registrationCountry: String
        constructor(data?: any) {
        }
    }

    export class Trailer {
        registrationNumber: String
        registrationCountry: String;
        constructor(data?: any) {
        }
    }

    export class AddressInfo {
        city: string;
        postcode: string;
        street: string;
        housenumber: string;
        countrycode: string;
            county: string;
        suburb: string;
        state: string;
        constructor(data?: any) {

        }
    }

    export class InsurancePolicyHolder {
        name: String
        firstName: String
        address: AddressInfo
        email: String
        phone: String
        dateOfBirth: any
        drivingLicenceNumber: String
        category: String
        drivingLicenceValidity: any;
        constructor(data?: any) {
            this.address = new AddressInfo();
            this.drivingLicenceValidity= new Date();
            this.dateOfBirth =  new Date();

        }
    }


    export class CertificateCardValidity {
        from: any;
        to: any;
        constructor(data?: any) {
            this.from = new Date();
            this.to = new Date();
        }

    }

    export class InsuranceCompany {
        name: String
        policyNumber: String
        greenCardNumber: String
        certificateCardValidity: CertificateCardValidity
        agency: String
        agencyContactName: String
        address: AddressInfo
        email: String
        phone: String
        materialDamageCovered: boolean
        constructor(data?: any) {
            this.certificateCardValidity = new CertificateCardValidity();
            this.address = new AddressInfo();
        }
    }

    export class InsuranceDetail {
        id: string;
        pictureUrl: string;
        userId: string;
        vehicleId: string;
        insuredVehicle: InsuredVehicle
        insurancePolicyHolder: InsurancePolicyHolder
        insuranceCompany: InsuranceCompany;
        constructor() {
            this.insuredVehicle = new InsuredVehicle();
            this.insurancePolicyHolder = new InsurancePolicyHolder();
            this.insuranceCompany = new InsuranceCompany();
        }

        public jsonToData(data?: any) {
            this.insuredVehicle = data.insuredVehicle ? data.insuredVehicle : new InsuredVehicle();
            this.insurancePolicyHolder = data.insurancePolicyHolder ? data.insurancePolicyHolder : new InsurancePolicyHolder();

            this.insuranceCompany = data.insuranceCompany ? data.insuranceCompany : new InsuranceCompany();


        }
    }
}

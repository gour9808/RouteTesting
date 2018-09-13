export class FleetVehicleView {
    vehicleId: string;
    name: string;
    ownerId: string;
    numberPlate?: {
        strLicense: string;
        locale?: {
            language: string,
            script: string,
            country: string,
            variant: string,
            extensionKeys: string[],
            unicodeLocaleAttributes: string[],
            unicodeLocaleKeys: string[],
            iso3Language: string,
            iso3Country: string,
            displayLanguage: string,
            displayScript: string,
            displayCountry: string,
            displayVariant: string,
            displayName: string
        };
    };
    make: string;
    model: string;
    profilePictureUrl: string;
    responseType: string;

    constructor() {
        this.vehicleId = "";
        this.name = "";
        this.ownerId = "";
        this.numberPlate = {
            strLicense: "", locale: {
                language: "",
                script: "",
                country: "",
                variant: "",
                extensionKeys: [],
                unicodeLocaleAttributes: [],
                unicodeLocaleKeys: [],
                iso3Language: "",
                iso3Country: "",
                displayLanguage: "",
                displayScript: "",
                displayCountry: "",
                displayVariant: "",
                displayName: ""
            }
        }
        this.make = "";
        this.model = "";
        this.profilePictureUrl = "";
        this.responseType = "PENDING"; //This will be always pending because the owner of the car needs to accept the request for adding the car into the fleet.
    }
}
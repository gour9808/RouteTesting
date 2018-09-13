export module Image {

    class Serializable {
        fillFromJSON(json: any) {
            var jsonObj = json;
            for (var propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] == 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName]
                this[propName] = jsonObj[propName]
            }
        }
    }
    enum ImageCategory {
        USER
    }

    export class ImageDetail {
        content: string;
        filename: string;
        imagetype: ImageCategory;
        objectid: string;

        constructor(data?:any) {
         



        }
    }
}
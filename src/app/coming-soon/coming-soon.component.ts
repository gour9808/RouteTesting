import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cbp-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  expandedItems: Array<any> = new Array<any>();
  
  cars = [{
    "id": 1,
    "driver_name": "Thacher Mapes",
    "driver_email": "sgonthard0@sfgate.com",
    "driver_number": "126-237-2914",
    "requestor_name": "Saunderson Gonthard",
    "requestor_email": "sgonthard0@comsenz.com",
    "requestor_number": "485-346-6593",
    "vehicle_make": "Volvo",
    "vehicle_model": "V40",
    "start_address": "3 Briar Crest Terrace",
    "end_address": "6 Prairieview Point",
    "pick_up_time": "10:21 PM",
    "vehicle_license": "MV6198",
    "request_status": "Ended"
  }, {
    "id": 2,
    "driver_name": "Clywd Edson",
    "driver_email": "otaile1@squidoo.com",
    "driver_number": "340-726-7257",
    "requestor_name": "Orbadiah Taile",
    "requestor_email": "otaile1@odnoklassniki.ru",
    "requestor_number": "115-692-2880",
    "vehicle_make": "Chevrolet",
    "vehicle_model": "Corvette",
    "start_address": "8 Tennessee Hill",
    "end_address": "91354 Armistice Park",
    "pick_up_time": "12:59 AM",
    "vehicle_license": "MV8954",
    "request_status": "Ended"
  }, {
    "id": 3,
    "driver_name": "Nilson Tamburo",
    "driver_email": "mkassman2@samsung.com",
    "driver_number": "268-591-5486",
    "requestor_name": "Mariam Kassman",
    "requestor_email": "mkassman2@ihg.com",
    "requestor_number": "959-636-6856",
    "vehicle_make": "Acura",
    "vehicle_model": "MDX",
    "start_address": "31745 Hooker Place",
    "end_address": "368 Fulton Circle",
    "pick_up_time": "7:40 AM",
    "vehicle_license": "MV6161",
    "request_status": "Assigned"
  }, {
    "id": 4,
    "driver_name": "Yolanthe Lillywhite",
    "driver_email": "tmatz3@wikipedia.org",
    "driver_number": "206-841-0174",
    "requestor_name": "Thibaud Matz",
    "requestor_email": "tmatz3@weebly.com",
    "requestor_number": "795-444-6038",
    "vehicle_make": "Porsche",
    "vehicle_model": "944",
    "start_address": "46 Little Fleur Pass",
    "end_address": "7625 Emmet Trail",
    "pick_up_time": "1:49 PM",
    "vehicle_license": "MV9307",
    "request_status": "Started"
  }, {
    "id": 5,
    "driver_name": "Faythe Trever",
    "driver_email": "sbrandoni4@addthis.com",
    "driver_number": "712-688-5963",
    "requestor_name": "Sam Brandoni",
    "requestor_email": "sbrandoni4@biglobe.ne.jp",
    "requestor_number": "958-577-0361",
    "vehicle_make": "Ford",
    "vehicle_model": "F250",
    "start_address": "4467 Eggendart Court",
    "end_address": "59523 Warbler Trail",
    "pick_up_time": "1:25 PM",
    "vehicle_license": "MV7562",
    "request_status": "Started"
  }, {
    "id": 6,
    "driver_name": "Alameda Vowles",
    "driver_email": "shounsham5@rambler.ru",
    "driver_number": "187-608-6293",
    "requestor_name": "Suzie Hounsham",
    "requestor_email": "shounsham5@usgs.gov",
    "requestor_number": "523-290-7251",
    "vehicle_make": "GMC",
    "vehicle_model": "Sonoma",
    "start_address": "761 Kings Avenue",
    "end_address": "9008 Magdeline Plaza",
    "pick_up_time": "8:42 AM",
    "vehicle_license": "MV9826",
    "request_status": "Started"
  }, {
    "id": 7,
    "driver_name": "Graham Macieja",
    "driver_email": "cbrockelsby6@istockphoto.com",
    "driver_number": "691-427-3531",
    "requestor_name": "Cally Brockelsby",
    "requestor_email": "cbrockelsby6@mysql.com",
    "requestor_number": "244-982-9009",
    "vehicle_make": "Nissan",
    "vehicle_model": "Altima",
    "start_address": "7781 Lakewood Gardens Crossing",
    "end_address": "65 Westend Parkway",
    "pick_up_time": "11:01 AM",
    "vehicle_license": "MV6510",
    "request_status": "Cancelled"
  }, {
    "id": 8,
    "driver_name": "Rheta Le Noury",
    "driver_email": "jgiriardelli7@plala.or.jp",
    "driver_number": "379-127-0220",
    "requestor_name": "Jonathan Giriardelli",
    "requestor_email": "jgiriardelli7@youku.com",
    "requestor_number": "216-274-8878",
    "vehicle_make": "Ford",
    "vehicle_model": "Escape",
    "start_address": "36154 Fuller Pass",
    "end_address": "8866 Melby Point",
    "pick_up_time": "5:13 AM",
    "vehicle_license": "MV5795",
    "request_status": "Assigned"
  }, {
    "id": 9,
    "driver_name": "Bettina Want",
    "driver_email": "bdo8@foxnews.com",
    "driver_number": "738-844-0906",
    "requestor_name": "Bill Do Rosario",
    "requestor_email": "bdo8@europa.eu",
    "requestor_number": "451-814-8924",
    "vehicle_make": "GMC",
    "vehicle_model": "Rally Wagon 2500",
    "start_address": "30 Riverside Junction",
    "end_address": "6 Melby Terrace",
    "pick_up_time": "3:21 PM",
    "vehicle_license": "MV9612",
    "request_status": "Assigned"
  }, {
    "id": 10,
    "driver_name": "Helge McKeveney",
    "driver_email": "myarker9@vk.com",
    "driver_number": "149-165-7771",
    "requestor_name": "Mauricio Yarker",
    "requestor_email": "myarker9@clickbank.net",
    "requestor_number": "597-659-5765",
    "vehicle_make": "Chevrolet",
    "vehicle_model": "Avalanche 1500",
    "start_address": "27 Bluestem Plaza",
    "end_address": "3 Dahle Parkway",
    "pick_up_time": "5:46 PM",
    "vehicle_license": "MV6491",
    "request_status": "Recieved"
  }, {
    "id": 11,
    "driver_name": "Margette Cannam",
    "driver_email": "fgelardia@ed.gov",
    "driver_number": "760-364-6633",
    "requestor_name": "Felicdad Gelardi",
    "requestor_email": "fgelardia@mysql.com",
    "requestor_number": "559-927-2314",
    "vehicle_make": "Mercedes-Benz",
    "vehicle_model": "S-Class",
    "start_address": "9937 Forest Dale Road",
    "end_address": "3230 Moose Trail",
    "pick_up_time": "2:41 PM",
    "vehicle_license": "MV4595",
    "request_status": "Started"
  }, {
    "id": 12,
    "driver_name": "Erwin Chritchlow",
    "driver_email": "mepiscopiob@xinhuanet.com",
    "driver_number": "636-451-1457",
    "requestor_name": "Margaux Episcopio",
    "requestor_email": "mepiscopiob@who.int",
    "requestor_number": "986-962-4548",
    "vehicle_make": "Pontiac",
    "vehicle_model": "Sunfire",
    "start_address": "4201 Manitowish Hill",
    "end_address": "9 Shoshone Street",
    "pick_up_time": "2:18 AM",
    "vehicle_license": "MV4261",
    "request_status": "Ended"
  }, {
    "id": 13,
    "driver_name": "Deirdre Jelks",
    "driver_email": "lbuckokec@prlog.org",
    "driver_number": "959-626-1616",
    "requestor_name": "Lowell Buckoke",
    "requestor_email": "lbuckokec@dedecms.com",
    "requestor_number": "984-241-6368",
    "vehicle_make": "Mercedes-Benz",
    "vehicle_model": "600SEC",
    "start_address": "8874 Commercial Junction",
    "end_address": "73 Pleasure Hill",
    "pick_up_time": "6:56 PM",
    "vehicle_license": "MV5423",
    "request_status": "Started"
  }, {
    "id": 14,
    "driver_name": "Sinclair Lount",
    "driver_email": "lvenablesd@bloglines.com",
    "driver_number": "998-845-9553",
    "requestor_name": "Lorilee Venables",
    "requestor_email": "lvenablesd@google.it",
    "requestor_number": "735-905-4938",
    "vehicle_make": "Lincoln",
    "vehicle_model": "Aviator",
    "start_address": "5537 Nova Point",
    "end_address": "63 Killdeer Lane",
    "pick_up_time": "10:35 PM",
    "vehicle_license": "MV6444",
    "request_status": "Assigned"
  }, {
    "id": 15,
    "driver_name": "Brenden Harpur",
    "driver_email": "rjurczyke@themeforest.net",
    "driver_number": "349-459-3009",
    "requestor_name": "Rozele Jurczyk",
    "requestor_email": "rjurczyke@ftc.gov",
    "requestor_number": "286-849-8141",
    "vehicle_make": "Maserati",
    "vehicle_model": "Quattroporte",
    "start_address": "1 Judy Road",
    "end_address": "118 Hoffman Way",
    "pick_up_time": "2:38 PM",
    "vehicle_license": "MV7168",
    "request_status": "Recieved"
  }, {
    "id": 16,
    "driver_name": "Ferdinanda Stopford",
    "driver_email": "tsjostromf@paypal.com",
    "driver_number": "155-561-8401",
    "requestor_name": "Timmi Sjostrom",
    "requestor_email": "tsjostromf@prlog.org",
    "requestor_number": "476-106-4185",
    "vehicle_make": "Toyota",
    "vehicle_model": "RAV4",
    "start_address": "6 Comanche Point",
    "end_address": "4883 Brown Terrace",
    "pick_up_time": "7:37 PM",
    "vehicle_license": "MV8368",
    "request_status": "Ended"
  }, {
    "id": 17,
    "driver_name": "Emera Gudde",
    "driver_email": "iohallagang@ifeng.com",
    "driver_number": "594-198-8438",
    "requestor_name": "Issi O'Hallagan",
    "requestor_email": "iohallagang@oaic.gov.au",
    "requestor_number": "521-653-3838",
    "vehicle_make": "Mazda",
    "vehicle_model": "MX-6",
    "start_address": "9949 Westport Park",
    "end_address": "40004 Tomscot Center",
    "pick_up_time": "12:07 AM",
    "vehicle_license": "MV8808",
    "request_status": "Assigned"
  }, {
    "id": 18,
    "driver_name": "Malva Bedborough",
    "driver_email": "ahempelh@example.com",
    "driver_number": "108-787-3823",
    "requestor_name": "Aggy Hempel",
    "requestor_email": "ahempelh@behance.net",
    "requestor_number": "850-830-0155",
    "vehicle_make": "Chevrolet",
    "vehicle_model": "1500",
    "start_address": "9 Artisan Crossing",
    "end_address": "8768 Memorial Way",
    "pick_up_time": "11:06 PM",
    "vehicle_license": "MV5239",
    "request_status": "Assigned"
  }, {
    "id": 19,
    "driver_name": "Sibby Netherwood",
    "driver_email": "fshillani@histats.com",
    "driver_number": "230-484-4986",
    "requestor_name": "Florella Shillan",
    "requestor_email": "fshillani@webs.com",
    "requestor_number": "466-444-3414",
    "vehicle_make": "Chevrolet",
    "vehicle_model": "S10",
    "start_address": "3681 Magdeline Pass",
    "end_address": "0 Annamark Center",
    "pick_up_time": "1:03 AM",
    "vehicle_license": "MV8223",
    "request_status": "Cancelled"
  }, {
    "id": 20,
    "driver_name": "Tracie Neesam",
    "driver_email": "gschustlj@columbia.edu",
    "driver_number": "736-495-3716",
    "requestor_name": "Giavani Schustl",
    "requestor_email": "gschustlj@surveymonkey.com",
    "requestor_number": "780-718-6695",
    "vehicle_make": "Suzuki",
    "vehicle_model": "Kizashi",
    "start_address": "50 Sunnyside Terrace",
    "end_address": "42636 Havey Pass",
    "pick_up_time": "7:11 PM",
    "vehicle_license": "MV6915",
    "request_status": "Started"
  }]
  constructor() { }
  ngOnInit() {
    this.cars.forEach((element,index) => {
      if(element.request_status!='Ended')
        this.expandedItems.push(this.cars[index]);
    });
  }

  getColor(status){
    switch (status){
      //Assigned,Recieved,Started,Ended,Cancelled
      case 'Assigned': 
        return '#4885ed';
      case 'Recieved': 
      return '#f4c20d';
      case 'Started': 
      return '#3cba54';
      case 'Ended': 
      return '#db3236';
      case 'Cancelled': 
      return '#db3236';
    }
  }

  getIcon(status){
    switch (status){
      //Assigned,Recieved,Started,Ended,Cancelled
      case 'Assigned': 
        return 'mdi-account-check';
      case 'Recieved': 
      return 'mdi-arrow-down';
      case 'Started': 
      return 'mdi-car-sports';
      case 'Ended': 
      return 'mdi-check-all';
      case 'Cancelled': 
      return 'mdi-close';
    }
  }

}

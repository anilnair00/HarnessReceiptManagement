import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService, ReceiptRequest } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-bulk-search',
  templateUrl: './bulk-search.component.html',
  styleUrls: ['./bulk-search.component.scss']
})
/**
 * This component handles csv file upload, parsing, and sending requests to query the index
 */
export class BulkSearchComponent implements OnInit {

  public requests: Array<ReceiptRequest> = new Array();
  public searchData: Array<ReceiptRequest> = new Array();
  public blobName: String = "";
  public csvData: Array<any> = new Array();
  
  bulk = "bulk"

  constructor(public translate: TranslateService, public app: AppService) {}

  @ViewChild('csvReader') csvReader: any;  
  ngOnInit() {
    this.loadZips();
    setInterval(() => this.loadZips(), 60000);
  }
  
  /**
   * Triggers on file upload, handles parsing csv
   * @param $event 
   */
  uploadListener($event: any): void {
    let translate = this.translate;  
  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        this.requests = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
      };  
  
      reader.onerror = function () {
        if (translate.currentLang === "en") {
          alert('Error: An unexpected error occurred while reading the file. Please try again.');  
        } else if (translate.currentLang === "fr") {
          alert("Erreur : Une erreur s’est produite pendant la lecture du fichier. Veuillez réessayer.");
        }
      };
  
    } else {  
      if (translate.currentLang === "en") {
        alert("Error: An error occurred while uploading the .csv file. Please import a valid .csv file.");
      } else if (translate.currentLang === "fr" ) {
        alert("Erreur : Une erreur s’est produite pendant le téléversement du fichier .csv. Veuillez importer un fichier .csv valide.")
      }
      this.clearData();  
    }  
  }  
  
  /**
   * Parses csv file and builds a request array
   * @param csvRecordsArray 
   * @param headerLength 
   * @returns array of requests from csv
   */
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let requestArr = [];  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let currentRecord = (<string>csvRecordsArray[i]).split(',');  
      if (currentRecord.length === headerLength) {  
        let request: ReceiptRequest = {
          booking_reference: currentRecord[0] ? currentRecord[0].trim(): null,
          ticket_number: currentRecord[1] ? currentRecord[1].trim(): null,
          issuing_date: currentRecord[2] ? currentRecord[2].trim(): null, 
          type: currentRecord[3] ? currentRecord[3].trim(): null,
        }
        requestArr.push(request); 
      }  
    }  
    return requestArr;  
  }  
  
  /**
   * Validates given file
   * @param file 
   * @returns true if filename ends in .csv
   */
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  /**
   * Parses csv for table headers
   * @param csvRecordsArr 
   * @returns array of table headers
   */
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  /**
   * Clears uploaded file and data
   */
  clearData() {
    this.csvReader.nativeElement.value = "";  
    this.requests = [];
    this.blobName = "";
  }

  /**
   * Calls the bulk-receipt-index to retrieve all existing bulk search zips
   */
  loadZips() {
    let results: any = [];
    let zipData: any = [];
    this.app.getBulkZips()
    .subscribe(response => {
      results.push(response);
      for (let data of results) {
        zipData.push(data.value);
      }
      this.searchData = zipData[0];
    });
  }

  /**
   * Performs a query on the index for each request in CSV
   */
  doSubmit() {
    if (this.requests.length === 0) {
      if (this.translate.currentLang === "en") alert('Please upload a .csv file before clicking submit');
      else if (this.translate.currentLang === 'fr') alert('Veuillez téléverser un fichier .csv avant de cliquer sur « Soumettre ».')
    }
    else {
      this.app.bulkSearch(this.blobName, this.requests)
      .subscribe(() => {
        if (this.translate.currentLang === "en") {
          alert("Receipt requests successfully sent. Please wait for them to be processed and return to the page in a few minutes");
        } else if (this.translate.currentLang === 'fr') {
          alert('Les demandes de reçus ont bien été envoyées. Veuillez attendre qu’elles soient traitées, '
          + 'puis revenez à cette page dans quelques minutes.')
        }
      }, error => {
        if (this.translate.currentLang === "en") {
          alert("Sending the requests failed, too many requests in short succession. Try again in a few moments"); 
        } else if (this.translate.currentLang === 'fr') {
          alert("L’envoi des demandes a échoué, trop de demandes ont été soumises dans un court laps de temps. "
          + "Veuillez réessayer dans quelques instants.");
        }
      });
    }
  }

}

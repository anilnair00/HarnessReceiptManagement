export const environment = {
  production: false,
  api: '025ADE1046D42AC6704F8915C225AE3D',
  clientId: '60ab4620-e1e6-44be-873b-34c47283bb78',
  storage:
    'https://stacacreceiptstorageint1.blob.core.windows.net/emails/tax-receipts/',
  sas: '?sv=2020-02-10&ss=bfqt&srt=co&sp=rwdlacupx&se=2028-04-11T17:11:32Z&st=2021-04-11T09:11:32Z&spr=https&sig=0evmyvhKUZKcBR%2Ff1XxQI4FQBcMrOvtIEgDoN916V3E%3D',
  bulkStorage:
    'https://stacacreceiptstorageint1.blob.core.windows.net/bulk-search-results/',
  query:
    '?sv=2020-02-10&ss=bfqt&srt=co&sp=rwdlacupx&se=2028-04-11T17:11:32Z&st=2021-04-11T09:11:32Z&spr=https&sig=0evmyvhKUZKcBR%2Ff1XxQI4FQBcMrOvtIEgDoN916V3E%3D',
  link: 'https://acs-receiptmanagement-int-03.search.windows.net/indexes/azureblob-index/docs/search?api-version=2020-06-30-Preview',
  newIndexLink:
    'https://acs-receiptmanagement-int-03.search.windows.net/indexes/receipt-emails-index/docs/search?api-version=2021-04-30-Preview',
  bulkLink:
    'https://fa-cac-receiptmanagement-int-02.azurewebsites.net/api/GenerateBulkSearchReport?code=aveKYZ6k34FsrJk8Z2QRvWelur/g65I95Q6UjsHaja/IsbzrsO/b3A==',
  zipLink:
    'https://acs-receiptmanagement-int-03.search.windows.net/indexes/bulk-search-report-index/docs?api-version=2021-04-30-Preview&search=*&%24orderby=completion_time%20desc',
};

// api: Api key associated with the account
// clientId: App service ID
// storage: email receipt storage
// sas: SAS token for emails container
// bulkStorage: bulk search results storage
// query: SAS token for bulk-search-results container
// link: url to access azureblob-index (old)
// newIndexLink: url to access receipt-emails-index (new)
// bulkLink: url for GenerateBulkSearchReports function app
// zipLink: url to bulk-search-report-index

export const environment = {
  production: false,
  api: '6233B434DB0C2F232622BF43E10D7B9C',
  clientId: '60ab4620-e1e6-44be-873b-34c47283bb78',
  storage:
    'https://stacacreceiptstoragecrt1.blob.core.windows.net/emails/tax-receipts/',
  sas: '?sp=racwdl&st=2021-04-11T14:00:40Z&se=2030-04-11T22:00:40Z&spr=https&sv=2020-02-10&sr=c&sig=mpjNbZ9HnOdj0T%2BPuIeLbaKxhc5090AZu7o4gFY93Po%3D',
  bulkStorage:
    'https://stacacreceiptstoragecrt1.blob.core.windows.net/bulk-search-results/',
  query:
    '?sp=rl&st=2022-06-10T17:06:51Z&se=2030-04-12T01:06:51Z&spr=https&sv=2021-06-08&sr=c&sig=tin15WwalF6N6poSsUH4P0NeBv49PvBlbOf2KgZsB%2Bk%3D',
  link: 'https://acs-receiptmanagement-crt-01.search.windows.net/indexes/azureblob-index/docs/search?api-version=2020-06-30-Preview',
  newIndexLink:
    'https://acs-receiptmanagement-crt-01.search.windows.net/indexes/receipt-emails-index/docs/search?api-version=2021-04-30-Preview',
  bulkLink:
    'https://fa-cac-receiptmanagement-crt-02.azurewebsites.net/api/GenerateBulkSearchReport?code=qn9ivPioczZIkUbv4W/IC8TDXwFQjvLF016HSmd2E0QZ4asDxJdL/w==',
  zipLink:
    'https://acs-receiptmanagement-crt-01.search.windows.net/indexes/bulk-search-report-index/docs?api-version=2021-04-30-Preview&search=*&%24orderby=completion_time%20desc',
};

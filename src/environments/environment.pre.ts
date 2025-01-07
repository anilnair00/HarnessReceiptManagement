export const environment = {
  production: false,
  api: '7B9405C50E82F8ECD1C85F14E9F4A152',
  clientId: '60ab4620-e1e6-44be-873b-34c47283bb78',
  storage:
    'https://stacacreceiptstoragepre1.blob.core.windows.net/emails/tax-receipts/',
  sas: '?sp=racwdl&st=2021-04-11T14:03:08Z&se=2030-04-11T22:03:08Z&spr=https&sv=2020-02-10&sr=c&sig=UT1uOS4oWbaAbQzRs%2BQvZR8jjG8LaGQJ6zi4CLPHqTg%3D',
  bulkStorage:
    'https://stacacreceiptstoragepre1.blob.core.windows.net/bulk-search-results/',
  query:
    '?sp=rl&st=2022-06-10T17:15:59Z&se=2030-04-12T01:15:59Z&spr=https&sv=2021-06-08&sr=c&sig=P%2FTQNTWNCZXnYUZ5B3dP0fAYCwNGo%2BI1IHKoBAX8ljo%3D',
  link: 'https://acs-receiptmanagement-pre-01.search.windows.net/indexes/azureblob-index/docs/search?api-version=2020-06-30-Preview',
  newIndexLink:
    'https://acs-receiptmanagement-pre-01.search.windows.net/indexes/receipt-emails-index/docs/search?api-version=2021-04-30-Preview',
  bulkLink:
    'https://fa-cac-receiptmanagement-pre-02.azurewebsites.net/api/GenerateBulkSearchReport?code=G6M7SFdMIHa7/bjyg9h9NSpxmXyhRbjFEKjNjvZV9ok7N1qx6je8oQ==',
  zipLink:
    'https://acs-receiptmanagement-pre-01.search.windows.net/indexes/bulk-search-report-index/docs?api-version=2021-04-30-Preview&search=*&%24orderby=completion_time%20desc',
};

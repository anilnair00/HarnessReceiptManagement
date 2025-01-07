export const environment = {
  production: true,
  api: '63F0C51252DA4C5AF4911B6D3AD280BE',
  clientId: '6bf7d321-87e3-46e4-921b-bf5f8ac2052a',
  storage:
    'https://stacacreceiptstorageprd1.blob.core.windows.net/emails/tax-receipts/',
  sas: '?sp=rl&st=2021-04-11T22:33:34Z&se=2030-04-12T06:33:34Z&spr=https&sv=2020-02-10&sr=c&sig=EZkz%2FtE7xBvD8rCl%2FbVt84GEsGjslJ%2BCkPNolljOJD0%3D',
  bulkStorage:
    'https://stacacreceiptstorageprd1.blob.core.windows.net/bulk-search-results/',
  query:
    '?sp=rl&st=2022-06-10T17:17:27Z&se=2030-04-12T01:17:27Z&spr=https&sv=2021-06-08&sr=c&sig=7LiYXPBpzLstiy3Tpq5rHpl1Rlxx0%2BlVyqnBlGsnOdY%3D',
  link: 'https://acs-receiptmanagement-prd-01.search.windows.net/indexes/azureblob-index/docs/search?api-version=2020-06-30-Preview',
  newIndexLink:
    'https://acs-receiptmanagement-prd-01.search.windows.net/indexes/receipt-emails-index/docs/search?api-version=2021-04-30-Preview',
  bulkLink:
    'https://fa-cac-receiptmanagement-prd-02.azurewebsites.net/api/GenerateBulkSearchReport?code=Pzt/lpqOKEaVHx3WJB1zfZoNjNNApU6hV3VOIkNjIVqJY0yP8rTsbw==',
  zipLink:
    'https://acs-receiptmanagement-prd-01.search.windows.net/indexes/bulk-search-report-index/docs?api-version=2021-04-30-Preview&search=*&%24orderby=completion_time%20desc',
};

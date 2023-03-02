// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   HOST_URL: 'http://localhost:5001',
  // HOST_URL: 'http://192.168.2.199:3000', // ลูกค้า
  // HOST_URL: 'http://188.166.190.30:3000', // บริษัท
  CompanyName: 'This is beta version',
  MQTT_HOST: '188.166.190.30',
  TOKEN_SECRET:'m6XmKvDR72TuF7',
};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login:'http://74.208.150.171:3501/api/v1/login',
  userprofile:'http://74.208.150.171:3501/api/v1/userprofile',
  department:'http://74.208.150.171:3501/api/v1/department',
  designation:'http://74.208.150.171:3501/api/v1/designation',
  question:'http://74.208.150.171:3501/api/v1/question',
  survey:'http://74.208.150.171:3501/api/v1/survey',
  surveyQuestion:'http://74.208.150.171:3501/api/v1/surveyquestion',
  surveyResponse:'http://74.208.150.171:3501/api/v1/surveyresponse',
  auditLog:'http://74.208.150.171:3501/api/v1/auditlog'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

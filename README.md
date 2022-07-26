# ESN Section Websites

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Installation

Clone this repo into a local folder. Navigate to the `src` folder in a command line and install packages using `yarn`. Then, you are ready to develop!

## Development

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Testing

Some basic cypress tests automatically run every Wednesday at 8a.m. via a scheduled GitHub action (and on each push to main). In case of failure, there is a message posted to the [ESN Germany Slack Workspace](https://esn-germany.slack.com/) (#website_monitoring). You can at all times run the tests locally using `yarn cy:run`.

## Build (locally, not needed if you want to publish the website)

Run `ng build` to build the project. **You need to set the environment variables `REPLACE_STRAPI_USER_ID` and `STRAPI_SECTION_ID` in `src/environment.(prod.)ts` in order to make it work.**
The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag for a production build.

## Publish a new version for ALL sections

1. Push the new version to the main branch of this repository.
2. Connect to the server of ESN Germany.
3. Start the script to build the new version for all websites. The timestamp is updated automatically.
   > Everything else will happen automatically within few minutes.

## Add a new section

// On ESN Germany server

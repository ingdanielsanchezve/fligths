# Fligths

_This is an Admin Panel to manage Subscribers flights contracted quota_

![screenshot_frontend](https://github.com/ingdanielsanchezve/fligths/assets/42616141/36209731-0a51-466c-aa54-6c00a05b3f60){ width=70% }

### Instalation 🔧

_Clone this repo_

_Install dependencies using `npm`_

```
npm install
```

## Database & Server Setup ⚙️

For serving the HTTP API i have used [json-server](https://github.com/typicode/json-server#add-custom-routes), this allows to get a full fake REST API with zero coding in less than 30 seconds, install it using this command:

```
npm install -g json-server
```

Then after install the package run the following command (Please replace ${REPO_PATH} properly based on your host):

```
json-server --watch ${REPO_PATH}/fligths/src/db/db.json
```

After server started check the output and set properly the enviroment vars in `.env` file (file .env.example is included in this repo)
```
VUE_APP_API_URL='http://localhost'
VUE_APP_API_PORT='3000'
```

## Getting Starting ⚙️

Execute next command to start the app, then go to the url shown in the terminal console, usually `http://localhost:8080/`
```
npm run dev
```


## Workflow

Once the App is running on your server you must see the next screen, with some stats about database records

![screenshot_frontend](https://github.com/ingdanielsanchezve/fligths/assets/42616141/36209731-0a51-466c-aa54-6c00a05b3f60){ width=70% }

### `Subscribers`

The Subscribers panel shows subscribers details, it has the check subscription details buttons, which open a modal and shows each subscriber subscription details

![subscribers_list](https://github.com/ingdanielsanchezve/fligths/assets/42616141/de2ee7cc-d0ec-4cb1-ae5e-ea01cda0df4f){ width=50% }

### `Subscription details window`

Subscription details window shows the data for the subscription for the selected user, it has buttons to open the quota editor and a history of the subscriptions past exceptions:

![subscribers_list](https://github.com/ingdanielsanchezve/reviews/assets/42616141/e8dd85bb-e12b-419e-a273-2545bc6b9da4){ width=50% }

### `Quota Editor`

Once the `Edit subscriber fligths quota` button is clicked the Editor component will be rendered with user current quota, buttons to add or reduce the user fligths quota, a dropdown to select the reason for any flight quota modification and a button to save the changes if any

![quota_editor](https://github.com/ingdanielsanchezve/reviews/assets/42616141/3066c009-a0f2-4926-b001-ec8c4c290c88){ width=50% }

### `Exceptions history`

This component is shown once the user clicks on the `Show Exceptions Log` button, it shows the subscriptions past exceptions history with details about each of them

![exceptions](https://github.com/ingdanielsanchezve/reviews/assets/42616141/537402ae-9e07-493b-b572-df4a6fb4622b){ width=50% }


## Built with Love ❤️ with

* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Tailwind](https://tailwindui.com/)
* [json-server](https://github.com/typicode/json-server#add-custom-routes)

## Credits
- Developed by: Daniel Sánchez
- UI Based on [Vue Notus](https://www.creative-tim.com/product/vue-notus) - v1.1.0 based on Tailwind Starter Kit by Creative Tim
    * Copyright 2021 Creative Tim (https://www.creative-tim.com)
    * Licensed under MIT (https://github.com/creativetimofficial/vue-notus/blob/main/LICENSE.md)
- Users avatar rendered from [randomuser](https://randomuser.me)

## License
The MIT License (MIT)
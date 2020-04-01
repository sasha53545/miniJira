## What's inside

It is an empty React project created for the code review 
purposes on the React course in MIPT (2019/2020).

## Pull requests

For everyone who wants to send homework for the code review 
special branch is created. The name of each branch looks 
like `homework/<telegram-name>`.

At the first step, you need to make a `fork` of the repository 
and continue inside your own copy.

When you have smth for the review, you should make a Pull 
request from your repository into `obabichev:homework/<telegram-name>`.

After that PR will be merged and score points added to the result 
table (or not added..^_^)


## Run project

This project was created with `create-react-app`. So all 
the scripts are the same including `npm start`, 
`npm run build`.

## Connect to the server

If you try to connect to the server (which one is on Heroku) 
you may get an error related to the CORS policy. It happens 
because you run the website on one domain (for example 
`localhost`), but try to make a request to the other (for 
example `https://react-mipt-course-server.herokuapp.com/`).

The easiest way to avoid this problem is to use proxy 
possibilities of the server create-react-app runs for you.

Just add a field `proxy` with the server url in `package.json`:

```json
{
  ...
  "proxy": "https://react-mipt-course-server.herokuapp.com/"
}
```

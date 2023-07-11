# Avelios Medical Frontend Coding Challenge

## Technical Requirements

- Make sure that you have the node version `18.16.0 (lts)` installed ([nvm](https://github.com/nvm-sh/nvm))
- Make sure that you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- Make sure that no applications are running on the ports `3000` and `4000`


## Setup

For this task you have to run a local node backend as well as a local frontend.
Please make sure to start the backend before running the frontend.

## Tasks

After starting the frontend you will see a sidebar with several tasks that you should implement.
For each task we defined the area of editable code (code that you are allowed to change in order to complete the task).

```typescript
/** Editable Code START **/
// you can do whatever you want here
// your comments also go here
/** Editable Code END **/
```

Make sure that you document the steps that lead to your final solution in the comments before submitting the coding challenge.
This is essential for all tasks related to code quality.


### Backend (Port 400)

You can find the backend in the folder [/backend](./backend).

To execute the backend change into the mentioned directory and execute:

```shell
yarn
```
to install all required dependencies. And

```shell
yarn start
```

to run the backend server.

After running the backend you should see a command line message stating:

```
🚀  Server ready at: http://localhost:4000/
```

**❗Important: do not change anything within this project!**

After restarting the backend the state will be reset. This gives you to test your implementations deterministically.

### Frontend (Port 3000)

You can find the backend in the folder [/frontend](./frontend). This folder contains a set of programming tasks which are marked as such.
You can derive all further implementation details in those files.

To execute the frontend change into the mentioned directory and execute:

```shell
yarn
```
to install all required dependencies. And

```shell
yarn start
```

to run the frontend server. 

**Hint:** After the execution you can access the frontend via the url [http://localhost:4000](http://localhost:4000) in your preferred browser.

## Graphql

All graphql changes that you make have to be done in the corresponding `*.graphql` files.
All required changes are marked as TODO comments. To build the typescript code run the command:
This will create all hooks that you require to solve the tasks.

```shell
yarn generate
```

After changing the

## Misc
// TODO: @Angelina

- ❗Please do not push your solution to GitHub or any other online platform.
- You are **NOT** allowed to install any additional libraries
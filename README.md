# nikko-dumrique-ecc-dssb-IS21-code-challenge-req101408

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup Prereqs](#setup-prereqs)
* [Setup](#setup)
* [Troubleshooting](#troubleshooting)

## General info
A full-stack application work sample which catalogs active projects within an organization.
	
## Technologies
Project is created with:
* Node.js version: 18.16.1
* Express.js version: 4.18.2
* Angular version: 16.1.1
* Docker version: 24.0.2
* swagger-jsdoc version: 6.2.8
* typescript: 5.1.3

## Setup Prereqs: 
To use this application, you must first install Docker on your local machine to run on the terminal. This should be done by installing bother Docker and Docker-Compose through Brew:
```
brew install docker
brew install docker-compose
```
Other installation versions of Docker can be found [here](https://docs.docker.com/desktop/).
Additionally Git must be installed on your local machine. Installation documents for Git can be found [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
A terminal is used to run the following setup commands.

## Setup

Running this project: 


1. clone the repository onto your local machine (SSH and HTTP examples are provided below).

##### SSH Clone:
```
git clone git@github.com:nkoda/nikko-dumrique-ecc-dssb-IS21-code-challenge-req101408.git
```

##### HTTP Clone:
```
git clone https://github.com/nkoda/nikko-dumrique-ecc-dssb-IS21-code-challenge-req101408.git
```


2. Navigate to the root of the repository directory:
```
cd nikko-dumrique-ecc-dssb-IS21-code-challenge-req101408
```

3. Run the dockerfile
```
$ docker build -t my-app .

```

4. Access the application at `http://localhost:4200` for the angular client app. The backend port is `http://localhost:3000`




## Troubleshooting
* If Docker fails to pull the associated images, you can manually run the applications by running 'npm start' within both the `backend` and `frontend` directories.

* Swagger documentation is provided by visiting the following url when application is running:
```
http://localhost:3000/api-docs/#/
```

* If you encounter this error from docker, "ERROR: failed to solve: node:14-alpine: error getting credentials - err: docker-credential-desktop resolves to executable in current directory (./docker-credential-desktop), out: ", please refer to this stackoverflow post: `https://stackoverflow.com/questions/65896681/exec-docker-credential-desktop-exe-executable-file-not-found-in-path`

```

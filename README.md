# Ulises Frontend

## Local Development (Docker & Proxy Configuration)

When running the application locally, you need to configure the Angular API proxy (proxy.conf.json) depending on whether your backend is running directly on localhost or inside a Docker container.

### Proxy Configuration (proxy.conf.json)

* Backend running in Docker (Local Dev):
  Use host.docker.internal so the Angular dev server can communicate with the containerized backend:

  {
    "/RestApi/rest": {
      "target": "http://host.docker.internal:8080/",
      "secure": false
    }
  }

* Backend running directly on host machine / Production target:
  Use localhost when running the backend server natively outside Docker:

  {
    "/RestApi/rest": {
      "target": "http://localhost:8080/",
      "secure": false
    }
  }


## Production Deployment (Apache Tomcat)

Follow these steps to build the application, package it into a WAR file, and deploy it to a Tomcat server under the `/rrhh/` context path.

### 1. Prerequisites
- Node.js and Angular CLI installed (or run this commands inside docker container).
- PowerShell (for compression commands on Windows).

### 2. Build and Package (.war)

Open a terminal at the root of the project and run the following commands:

```powershell
# 1. Build the app for production with the base href set
ng build --configuration production --base-href /rrhh/

# 2. Navigate to the output directory
cd dist/<app-name>

# 3. Compress the contents and rename to WAR format
Compress-Archive -Path * -DestinationPath rrhh.zip
Rename-Item -Path rrhh.zip -NewName rrhh.war

# 4. SCP to server.
scp rrhh.war administrador@172.19.10.49:/opt/apache-tomcat-10.0.17-RRHH/webapps/
```


Business Ak: A transport company would like to Digitally transofrm their business. The Company "Vahan Services" operates a fleet of trucks to carry goods across India. Right now they have a fleet of about 20 - 30 trucks. Design and application for this company to adopt and operate upon. 


1. User Management
2. Analytics and Observability
3. Prototyping of services ( Using TOGAF framework) - Break this in microservices.
4. DB - Support for multi-tenant applications.
5. AI - AI based services for tracking of good etc. 

Front End:




Back End:



DB



IaC: 


Backend--- POST call with Sanjay:
Step 1: Setup and configure NestJS:
commands:
nest new project-name
cd project-name
npm i --save @nestjs/microservices
npm install --save @nestjs/swagger
npm i --save @nestjs/config
npm install --save @ag-ui/core
npm install --save @ag-ui/core openai uuid

Step 2: Create 2 services relevant to your transportation app. Booking and tracking app. 
cmd: nest generate app booking-app
     nest generate app tracking-app
     nest generate app ai-orchestrator

Disclaimer:
1. Reference documents:
     https://www.cometchat.com/docs/ai-agents/cometchat-ag-ui-nestjs
     https://docs.ag-ui.com/sdk/js/core/multimodal-inputs
     https://docs.ag-ui.com/quickstart/server

2. Otel with Nextjs
     https://medium.com/@jsteinb/next-js-monitoring-your-app-with-open-telemetry-6f1e5e8148fa

     OpenTelemetry Collector (ports 4317, 4318)
     Jaeger UI: http://localhost:16686
     Zipkin UI: http://localhost:9411
     Prometheus: http://localhost:9090

     Otel Architecture: 
     https://opentelemetry.io/docs/collector/

NestJS Interceptors -> 
https://oneuptime.com/blog/post/2026-02-03-nestjs-interceptors/view

4. Mongo:
https://medium.com/globant/crud-application-using-nestjs-and-mongodb-99a0756adb76
CRUD - https://dev.to/nahuleswaran_s24cb031_b4/crud-operations-in-mongodb-student-management-system-78i

5. NestJS Validation Pipes
https://dev.to/italoqueiroz/nestjs-validationpipe-ensuring-secure-input-contracts-3dng
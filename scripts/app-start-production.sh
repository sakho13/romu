#!/bin/bash

npm run build

npm run prisma:deploy

npm run prisma:seed

npm start

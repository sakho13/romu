#!/bin/bash

npm run prisma:deploy

npm run prisma:seed

tail -f /dev/null
#Neptune - Docker Management System

Neptune is a Docker management system. It can manage Docker machine, container, image and volume for remote machine or local machine. 

This project is not completed and under heavy development now. Please do not use this for production in this stage.

## Supported Function

**Machine**

1. Create*
2. Start
3. Stop
4. Remove

**Machine Driver**

1. Oracle VirtualBox

**Container**

1. Create
2. Start
3. Stop
4. Pause
5. Unpause
6. Remove
7. Inspect
8. Log Stream

**Image**

1. Pull
2. Remove

**Docker Registry**

1. Search

## Required Software

1. Node.js (https://nodejs.org/en/)
2. Docker Machine (https://docs.docker.com/machine/install-machine/)

## Developer Install

Recommend install **Oracle VirtualBox** for development. (https://www.virtualbox.org/)

**Backend:**

1. git clone https://github.com/lawrence0819/neptune-back
2. cd neptune-back
3. npm run dev

**Frontend:**

1. git clone https://github.com/lawrence0819/neptune-front
2. cd neptune-front
3. npm run dev
4. Browser: http://localhost:8080/webpack-dev-server/index.html

## Screenshot

![neptune](https://cloud.githubusercontent.com/assets/1160838/11606191/ffd52210-9b52-11e5-884c-b7600deeb7ef.png)

![dashboard](https://cloud.githubusercontent.com/assets/1160838/11866130/ec9b81c2-a4e3-11e5-977d-8b123272eb8f.png)

![containers](https://cloud.githubusercontent.com/assets/1160838/11866129/ec7628aa-a4e3-11e5-801d-07dd1bf1fa70.png)

![container-creation-form](https://cloud.githubusercontent.com/assets/1160838/11866123/e7e06c60-a4e3-11e5-9345-4a6afd24a2e8.png)

![images](https://cloud.githubusercontent.com/assets/1160838/11866132/ecc84df6-a4e3-11e5-83ef-5a81bb623c9d.png)

![pull-image-form](https://cloud.githubusercontent.com/assets/1160838/11866131/ecc7dfd8-a4e3-11e5-9140-166e5680c8c5.png)

## TODO

1. Test
2. Container Link
3. Container Volume
4. Support Local Docker
5. Network

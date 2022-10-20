Demo Project
## Follow these steps below to make sure the application running in the correct way

- Make sure your local machine has been installed the docker, docker-compose
- Modify .env.example file to .env and config the corresponding information into .env file
- docker-compose up
- yarn install
- npx prisma db push
- npx prisma db seed
- yarn start:dev
- default api url http://localhost:3303/
- api doc http://localhost:3303/api 
## ToDos
- [x] management system for the administrator to list/create/edit/delete
rooms consisting of type, description, image, quantity, and price.
- [x] API customer
    - [x] API to list all the available rooms for any particular day in the future
    - [x] API to book multiple rooms for a number of days
    - [x] API to cancel any booking
- [x] Administrator can login, logout and create/delete other administrator or chef
- [x] Customer can sign up, sign in, signout
- [x] Customer can edit any booking before the start date
- [x] API to list all the available rooms for any particular time frame in the future
- [ ] Support records of changes of the rooms for audit trail (in process)
- [ ] Queue-integrated system that ensures that no more than one customer book at the same time

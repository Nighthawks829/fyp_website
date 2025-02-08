# IoT Monitoring and Control Ecosystem with MQTT Server Integration and Web Technologies

## Project Overview

This project aaims to create an IoT Monitoring and Control Ecossystem that integrates MQTT for real-time communication between IoT devices (like sensors and actuators) and a web-based frontend. The frontend is built using React.js and Redux for state management, and it interacts with an MQTT server (Mosquitto) for receiving and sending sensor data and control messages. The system enables real-time monitoring and control of IoT decvices through intuitive web interface, making it suitable for applications like smart home automation, industrial monitoring and sensor-based data visualization.

## Features

- Real-time Sensor Monitoring: Display sensor data such as temperature, humidity, motion detection and more using MQTT.
- Actuator Control: Toggle switches, button and sliders to control IoT devices (LEDs, motors, buzzers, etc.).
- User Authentication: Secure login and user management system using JWT authentication.
- Dashboard Management: Customizable dashboad cards to visualize sensor data using **Chart.js**
- Notification: Receive alert based on sensor thresgold and conditions
- Responsive UI: Built with Bootstrap for a modern and mobile-friendly design.
- Board Management: Add, edit or delete IoT boards
- Sensor Management: Add, edit or delete IoT sensors.
- User Management - Add, edit or delete system users.

## Tech Stack

### Frontend:

- React.js: Component-based UI development
- Redux & Redux Toolkit - State Management
- React Router: Navigation handling
- Bootstrap: UI styling and responsiveness
- Chart.js: Graphical visualization of sensor data
- MQTT.js: MQTT client integration for real-time updates

## Installation

### Prerequisites

- Node.js (>=16.x)
- npm or yarn
- MQTT Broker (e.g., Mosquitto) running on a Raspberry Pi or cloud server
- Backend API service (Ensure it's configured and running) [IoT Monitoring and Control Ecosystem - Backend API](https://github.com/Nighthawks829/fyp_server)

### Setup Instructions

1. Clone the repository:

```sh
git clone https://github.com/Nighthawks829/fyp_website.git
```

2. Navigate to the project directory

```sh
cd fyp_website
```

3. Install dependencies

```sh
npm install
# or
yarn install
```

### Running the Application

1. Start Backend Server
2. Start frontend (React App)

```sh
npm start
# or
yarn start
```

3. Access the frontend website at:

```
http://localhost:3000
```

## Deployment

To deploy on a production server:

```sh
npm run build
# or
yarn build
```

Deploy the generated `build/` folder to any static hosting service such as:

- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the repository
2. Create a new branch

```sh
git checkout -b feature-branch
```

3. Make your changes

4. Commit your change:

```sh
git commit -m 'Add some feature'
```

5. Push to the branch

```sh
git push origin feature-branch
```

6. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

Liew Shai Sam - liew_shai_bi21@iluv.ums.edu.my

[IoT Monitoring and Control Ecosystem - Backend API](https://github.com/Nighthawks829/fyp_server)

## Acknowledgements

I would like to express our gratitude to the following individuals and organizations for their support and contributions to this project:

- PM. Dr. Chin Kin On, Dr. James Mountstephens, and Dr. Azali Saudi – For their invaluable guidance and feedback throughout the development of this IoT Monitoring and Control Ecosystem.
- Open-Source Communities – Special thanks to the contributors behind open-source technologies like Node.js, Express.js, Sequelize, Mosquitto MQTT, React.js, Redux Toolkit, React Router, Bootstrap, Axios, and Chart.js, which made this project possible.
- Friends & Family – For their unwavering support, encouragement, and patience throughout the project.

<!-- ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it. -->

<!-- ## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

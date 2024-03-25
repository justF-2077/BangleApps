# Better step counter

This application is a custom step counter for the Bangle.js smartwatch. It aims to improve the accuracy of the step count by discarding single steps that occur with more than 5 seconds in between, assuming that it is unlikely for single steps to occur within short time frames. This tries to filter out movements by the Bangle.JS that were falsely considered as step.

## Usage

To use the step counter, simply install the app on your Bangle.js smartwatch and start walking. The app will automatically count your steps by adding very few lines of `boot` code.

## Features

- Accurate step counting: The app uses a custom algorithm to improve the accuracy of the step count.
- very CPU efficient and low power consumption 

## Requests

For support or update requests, please contact me via GitHub: https://github.com/Ishidres

## Contributing
Thanks for using this app! If you appreciate it or want to support its development, feel free to contribute by:
- 🔀 submitting [pull requests](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) ![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr/Ishidres/BangleApps)
- ⭐ or by starring my [BangleApps fork](https://github.com/Ishidres/BangleApps) on GitHub ![GitHub Repo stars](https://img.shields.io/github/stars/Ishidres/BangleApps)

## Creator

[![Ishidres on GitHub](https://img.shields.io/github/followers/Ishidres?label=Ishidres)](https://github.com/Ishidres)

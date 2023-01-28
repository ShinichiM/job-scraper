# job-scraper

<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![LinkedIn][linkedin-shield]](https://linkedin.com/in/shinichi-miyakawa)




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github/shinichiM/job-scraper">
    <img width="80" alt="image" src="https://user-images.githubusercontent.com/62361626/166833097-89356e0b-ab12-4a91-800c-27aee7069b2b.png">
  </a>

  <h3 align="center">Job-Scraper</h3>

  <p align="center">
    <a href="https://us-central1-job-scraper-5b752.cloudfunctions.net/scrape?title=Software%20Engineer&location=Seattle,%20Washington">View Demo</a>
    ·
    <a href="https://github.com/ShinichiM/job-scraper/issues">Report a Bug</a>
    ·
    <a href="https://github.com/ShinichiM/job-scraper/issues">Request a Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>





<p align="center">
   <img width="944" alt="image" src="https://user-images.githubusercontent.com/62361626/215229576-0dc65546-f2f7-4d2a-9c34-7da7ce521fb6.png">
</P>

<!-- ABOUT THE PROJECT -->
## About The Project

A custom API Endpoint that will scrape job data from Indeed.com! The endpoint will return a JSON Array with data in the following format:
```
{ title: "", company: "", location: "", experience: "" }
```
The title, company, and location properties are fairly straight forward. However, the experience property is a boolean that is
determined by: whether the job is a Senior position or if prior experience is stated in the short description provided in the Job Snippet:

<img width="365" alt="image" src="https://user-images.githubusercontent.com/62361626/215229194-c7fe9077-bcec-446d-826e-1656a4044960.png">

The API endpoint below. Copy and paste this endpoint and input the job title and location that you're looking for!
```
https://us-central1-job-scraper-5b752.cloudfunctions.net/scrape?title={Input a Job Title}&location={Input a Location}.
```


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Node.js](https://nodjs.org/)
* [JavaScript](https://www.javascript.com/)
* [Firebase](https://firebase.google.com/)
* [Puppeteer.js](https://pptr.dev/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Installation

_Below is an example of how you can install and setting up this application. This will install any dependencies required to run this application

1. Clone the repo
   ```sh
   git clone https://github.com/shinichiM/job-scraper.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start firebase emulator for local testing
   ```js
   npm run serve
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Indeed deprecated their Job Search API so I decided to create my own through Puppeteer.js Web Scraping! Copy the url endpoint above and input a job and location you're looking for

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Shinichi Miyakawa - miyakawashi@gmail.com

Project Link: [https://github.com/shinichiM/job-scraper](https://us-central1-job-scraper-5b752.cloudfunctions.net/scrape?title=Software%20Engineer&location=Seattle,%20Washington)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

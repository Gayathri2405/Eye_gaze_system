// Copyright 2023 MediaPipe & Malgorzata Pick
import React, { Fragment, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  FaceMesh,
  // FACEMESH_TESSELATION,
  FACEMESH_RIGHT_IRIS,
  FACEMESH_LEFT_IRIS,
  FACEMESH_LEFT_EYE,
  FACEMESH_RIGHT_EYE
  // FACEMESH_FACE_OVAL,
} from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { drawnectors } from "@mediapipe/drawing_utils";
// import InfoIcon from "../../components/infoIcon/InfoIcon";
const Rock = () => {
  // Global settings
  const webcamRef = useRef(null);
  const [positionIndicator, setPositionIndicator] = useState("");
  const [gazingRightTimer, setGazingRightTimer] = useState(null);
  const [useChoice, setUseChoice] = useState("");
  const [randomChoice, setRandomChoice] = useState("");
  const [gazingLeftTimer, setGazingLeftTimer] = useState(null);
  const [gazingCenterTimer, setGazingCenterTimer] = useState(null);
  const [prevUserChoice, setPrevUserChoice] = useState("");
  const [clearValues, setClearValues] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  //const keyboardRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [PDValue, setPDValue] = useState("");
  const [PDResult, setPDResult] = useState("");


  const [userChoice] = useState("rock");
  const [result, setResult] = useState("");
  const [computerChoice, setComputerChoice] = useState("");


 // const [averageValue, setAverageValue] = useState(0);
  const [numbersList, setNumbersList] = useState([]);
  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let width = 384.0;
  let height = 288.0;
  if (deviceWidth < 670 && deviceWidth >= 510) {
    width = 480.0;
    height = 360.0;
  }
  if (deviceWidth < 510 && deviceWidth >= 390) {
    width = 360.0;
    height = 360.0;
  }
  if (deviceWidth < 390) {
    width = 240.0;
    height = 240.0;
  }
  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user",
  };
  // Function to calculate distance between two points / pupils
  const getDistance = (p1, p2) => {
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2) +
        Math.pow(p1.z - p2.z, 2)
    );
  };



  useEffect(() => {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    setComputerChoice(randomChoice);

    // Compare user choice with computer choice and determine the result
    let gameResult;
    if (userChoice === "rock") {
      if (randomChoice === "scissors") gameResult = "You win!";
      else if (randomChoice === "paper") gameResult = "Computer wins!";
      else gameResult = "It's a tie!";
    
    }
    setResult(gameResult);
  }, [userChoice,computerChoice]);




  useEffect(() => {
    // This useEffect hook will run whenever the 'result' or 'navigate' variables change.

    // Set up a timeout to redirect to the GamingPage after 5 seconds
    const redirectTimeout = setTimeout(() => {
        // This function will be called after 5 seconds
        navigate('/gaming'); // Redirect to the GamingPage
    }, 6000); // 5000 milliseconds = 5 seconds

    // The cleanup function returned by useEffect.
    // It will be called when the component unmounts or when 'result' or 'navigate' changes.
    return () => {
        // This function clears the timeout, preventing the redirection if the component unmounts
        clearTimeout(redirectTimeout);
    };
}, [result, navigate]);



  // Loading webcam and setting Face Mesh API when image source changes
  useEffect(() => {
    // Function to run canvas with video and Face Mesh when ready
    const onResults = (results) => {
      // Setting canvas - references and context
      const canvasElement = canvasRef.current;
      canvasElement.width = width;
      canvasElement.height = height;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      // Loading Face Mesh landmarks for iris and getting coordinates for pupils
      if (results.multiFaceLandmarks && results.multiFaceLandmarks[0]) {
        let pupils = {
          left: {
            x:
              (results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]].x +
                results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[2][0]].x) /
              2.0,
            y:
              (results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]].y +
                results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[2][0]].y) /
              2.0,
            z:
              (results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]].z +
                results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[2][0]].z) /
              2.0,
            width: getDistance(
              results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]],
              results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[2][0]]
            ),
          },
          right: {
            x:
              (results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[0][0]].x +
                results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[2][0]].x) /
              2.0,
            y:
              (results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[0][0]].y +
                results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[2][0]].y) /
              2.0,
            z:
              (results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[0][0]].z +
                results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[2][0]].z) /
              2.0,
            width: getDistance(
              results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[0][0]],
              results.multiFaceLandmarks[0][FACEMESH_RIGHT_IRIS[2][0]]
            ),
          },
        };
        // Setting variables for calculation disance between pupils
        let distance = getDistance(pupils.left, pupils.right);
        let irisWidthInMM = 12.0;
        let pupilWidth = Math.min(pupils.left.width, pupils.right.width);
        let pd = (irisWidthInMM / pupilWidth) * distance;
        // Setting real-time pupillary distance
        setPDValue(pd.toFixed(0));
        // Drawing Face Mesh results of pupils on canvas
        canvasCtx.fillStyle = "#22b9ad";
        // Left
        
        canvasCtx.fillRect(
          pupils.left.x * width - 1,
          pupils.left.y * height - 1,
          2,
          2
        );
        
        // Right
        
        canvasCtx.fillRect(
          pupils.right.x * width - 1,
          pupils.right.y * height - 1,
          2,
          2
        );
        //inner left eye
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[0][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[0][0]].y * height -1,
          2,
          2
        );
          //inner right eye
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[0][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[0][0]].y * height -1,
          2,
          2
        );
          //outer left eye
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[7][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[7][0]].y * height -1,
          2,
          2
        );
        
          //outer right eye
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[7][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[7][0]].y * height -1,
          2,
          2
        );
        
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[4][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[4][0]].y * height -1,
          2,
          2
        );
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[12][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_RIGHT_EYE[12][0]].y * height -1,
          2,
          2
        );
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[4][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[4][0]].y * height -1,
          2,
          2
        );
        canvasCtx.fillRect(
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[12][0]].x * width - 1,
          results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[12][0]].y * height -1,
          2,
          2
        );
        // Calculate distance between inner corner and pupil for the left eye
        let innerCornerDistanceLeft = getDistance(
  results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[0][0]],
  pupils.left
  //results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]]
        );
        // Calculate distance between outer corner and pupil for the left eye
        let outerCornerDistanceLeft = getDistance(
        results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[7][0]],
        pupils.left
        //results.multiFaceLandmarks[0][FACEMESH_LEFT_IRIS[0][0]]
        );
         // Calculate distance between pupil center and top point 
let distancePupilTop = getDistance(
  
  results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[12][0]],
  pupils.left
);
// Calculate distance between pupil center and bottom point 
let distancePupilBottom = getDistance(
  
  results.multiFaceLandmarks[0][FACEMESH_LEFT_EYE[4][0]],
  pupils.left
);
      
        // Drawing Face Mesh landmarks of iris on canvas (and face oval and tessellation if you want)
        for (const landmarks of results.multiFaceLandmarks) {
          // drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
          //   color: "#C0C0C070",
          //   lineWidth: 1,
          // });
          //drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {
           // color: "#ffffff00",
           // lineWidth: 0.5,
          //});
          //drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {
           // color: "#ffffff00",
           // lineWidth: 0.5,
          //});
          // drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {
          //   color: "#E0E0E0",
          // });
        }
      }
      
      canvasCtx.restore();
    };
    // Starting new Face Mesh
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);
    // Starting new camera
    const videoElement = webcamRef.current;
    if (
      imgSrc === null &&
      typeof videoElement !== "undefined" &&
      videoElement !== null
    ) {
      const camera = new Camera(videoElement.video, {
        onFrame: async () => {
          await faceMesh.send({ image: videoElement.video });
        },
        width: width,
        height: height,
      });
      camera.start();
      document.querySelector(".container-img").style.display = "none";
    }
    return () => {};
  }, [imgSrc, height, width, deviceWidth]);
  useEffect(() => {}, [numbersList, PDResult]);
  // Function for hiding container with introduction and showing container with info
  /*const showInfo = () => {
    document.querySelector("#card-1").style.display = "none";
    document.querySelector("#card-2").style.display = "flex";
    document.querySelector(".container-display").style.display = "none";
    document.querySelector(".container-img").style.display = "none";
  };*/
  // Function for hiding container with info and showing results with video
  /*const openApp = () => {
    document.querySelector("#card-2").style.display = "none";
    document.querySelector(".container-display").style.display = "flex";
  };*/
  // Function to capture image from canvas with Face Mesh and hide video section
  // Function to generate random choice
 

  const capturePhoto = () => {
    document.querySelector(".container-img").style.display = "flex";
    document.querySelector(".container-video").style.display = "none"; // Hide webcam feed
    const canvas = document.querySelector("#output-canvas");
    const data = canvas.toDataURL("image/png");
    setImgSrc(data);
    //document.querySelector(".container-display").style.display = "none";
    setPDResult(PDValue);
    const tempNumbers = [...numbersList];
    tempNumbers.push(+PDValue);
    console.log("All numbers: ");
    console.log(tempNumbers);
    setNumbersList(tempNumbers);
    //let average = tempNumbers.reduce((a, b) => a + b, 0) / tempNumbers.length;
    //console.log("Average: ");
    //console.log(average);
    //setAverageValue(tempNumbers.length > 0 ? average.toFixed(0) : 0);
  };
  // Function to reset image source and showing back video section
  const resetPhoto = () => {
    setImgSrc(null);
    document.querySelector(".container-display").style.display = "flex";
    document.querySelector(".container-video").style.display = "flex"; // Show webcam feed
    document.querySelector(".container-img").style.display = "none";
  };
  //const [positionIndicator, setPositionIndicator] = useState("");
  const keyboardRef = useRef(null)
  
  
  // DOM elements which shows depending on what's happening in app
  return (
    <Fragment>
      <div className="container-app">
        <div className="container-display">
        <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
          <h3>Rock</h3>
          {/* Display user's choice */}
          <p>Your choice: {userChoice}</p>
          {/* Display computer's choice */}
          <p> Computer's choice: {computerChoice}</p>
          {/* Display result */}
          <p>Result:{result}</p>
          {/* Display game options */}
          </div>
          {/* Buttons for user interaction */}
          <div className="values" style={{ display: "flex" }}>
            <button
              className="buttonClass"
              style={{ width: "160px", height: "125px", fontSize: "18px", textAlign: "center", marginRight: "350px" }}
              onClick={() => navigate('/Rock')}
            >
              Rock
            </button>
            <button
              className="buttonClass"
              style={{ width: "160px", height: "125px", fontSize: "18px", textAlign: "center", marginRight: "350px" }}
              onClick={() => navigate('/Paper')}
            >
              Paper
            </button>
            <button
              className="buttonClass"
              style={{ width: "160px", height: "125px", fontSize: "18px", textAlign: "center" }}
              onClick={() => navigate('/Scissors')}
            >
              Scissors
            </button>
          </div>
          {/* Button to redirect to home page */}
          <div style={{ marginTop: "210px" }}>
            <button
              className="buttonClass"
              style={{ width: "160px", height: "50px", fontSize: "18px", textAlign: "center" }}
              onClick={() => navigate('/gaming')}
            >
              Game
            </button>
          </div>
        </div>
        {/* Container for displaying captured image */}
        <div className="container-img">
          <img src={imgSrc} className="result" id="photo" alt="screenshot" />
          <div className="values"></div>
        </div>
      </div>
      {/* Webcam container positioned at the bottom */}
      <div className="container-video" style={{ position: 'fixed', bottom: -300, left: 0, right: 0, margin: 'auto' }}>
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          width={width}
          height={height}
          audio={false}
          imageSmoothing={true}
          screenshotFormat="image/jpeg"
          id="input-video"
          className="result"
          style={{ display: "none" }}
        />
        <canvas
          ref={canvasRef}
          id="output-canvas"
          className="result"
          style={{ marginLeft: "auto", marginRight: "auto", left: 0, right: 0, textAlign: "left", zindex: 9, width: width, height: height }}
        ></canvas>
      </div>
    </Fragment>
  );
  
};
export default Rock;

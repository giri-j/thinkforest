'use client';

import React from 'react';

const FlowerAnimation = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center pointer-events-none">
      {/* Petal containers */}
      <div className="container1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      <div className="container8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5vw] h-[5vw]">
        <div className="petal" />
      </div>
      
      <div className="center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5vw] h-[1.5vw] bg-orange-400 rounded-full z-[20000]" />

      <style jsx>{`
        .container2 { transform: translate(-50%, -50%) rotate(90deg); }
        .container3 { transform: translate(-50%, -50%) rotate(180deg); }
        .container4 { transform: translate(-50%, -50%) rotate(270deg); }
        .container5 { transform: translate(-50%, -50%) rotate(45deg); }
        .container6 { transform: translate(-50%, -50%) rotate(135deg); }
        .container7 { transform: translate(-50%, -50%) rotate(225deg); }
        .container8 { transform: translate(-50%, -50%) rotate(315deg); }

        .petal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 30%;
          width: 60%;
          background-color: #FEFBF3;
          border: solid 3px #EAEFF0;
          border-radius: 100vw;
          animation: go 5s infinite;
        }

        @keyframes go {
          0% {
            top: 50%;
          }
          12.5% {
            top: 0%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          25% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          37.5% {
            top: 50%;
            left: 0%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          50% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          62.5% {
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          75% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          87.5% {
            top: 50%;
            left: 100%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
          100% {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FlowerAnimation;

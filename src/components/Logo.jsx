import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";
import LogoCSS from "../css/logo.module.css";
import "pathseg";

const Logo = ({ matterContainerRef }) => {
  useEffect(() => {
    // Module aliases
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      World = Matter.World,
      Svg = Matter.Svg,
      Vector = Matter.Vector,
      Vertices = Matter.Vertices;

    let path = document.getElementById("svg_path");

    // Window dimensions, width declareances
    const windowWidth = matterContainerRef.current.clientWidth;
    const windowHeight = matterContainerRef.current.clientHeight;
    const desiredWidth = 800;
    const desiredHeight = 950;
    let scaledImageWidth, scaledImageHeight;

    // Declare letterBody, array and sizes
    let letterBody;
    const letterBodies = [];

    // Create an engine
    const engine = Engine.create();
    engine.gravity.y = -0.3;

    // Create a renderer
    const render = Render.create({
      element: matterContainerRef.current,
      engine: engine,
      options: {
        width: matterContainerRef.current.clientWidth,
        height: matterContainerRef.current.clientHeight,
        wireframes: false,
        background: "white",
        pixelRatio: 2,
      },
    });

    const canvasElement = render.canvas;
    if (canvasElement) {
      canvasElement.classList.add("canvas");
    }

    // Define an array of letters with their properties
    const letters = [
      { text: "Z", sprite: "Z.svg", x: 230, y: 900, angle: 0, scaleX: 1, scaleY: 1 },
      { text: "A", sprite: "A.svg", x: 230, y: 900, angle: 0, scaleX: 1, scaleY: 1 },
      { text: "A", sprite: "A2.svg", x: 230, y: 900, angle: 0, scaleX: 1, scaleY: 1 },
      { text: "R", sprite: "R.svg", x: 230, y: 900, angle: 0, scaleX: 1, scaleY: 1 },
      { text: "<3", sprite: "<3.svg", x: 700, y: 1000, angle: 0, scaleX: 1, scaleY: 1 },
    ];

    // Set the desired horizontal spacing between letters
    const letterSpacing = 320;

    // Set the x value for the letters
    let x = 230;

    for (const letter of letters) {
      // Load the image for the letter
      const letterImage = new Image();
      letterImage.src = `/${letter.sprite}`;

      letterImage.onload = () => {
        // Retrieve the original letter image dimensions
        const letterImageWidth = letterImage.width;
        const letterImageHeight = letterImage.height;

        // Calculate scaling factors for both width and height
        const scaleX = desiredWidth / letterImageWidth;
        const scaleY = desiredHeight / letterImageHeight;

        // Update the scaleX and scaleY properties of the current letter object
        letter.scaleX = scaleX;
        letter.scaleY = scaleY;

        // Create vertices for the body based on the scaled image dimensions
        const vertices = Vertices.fromPath(`M0 0 L${letterImageWidth} 0 L${letterImageWidth} ${letterImageHeight} L0 ${letterImageHeight}`);

        letterBody = Bodies.fromVertices(x, letter.y, vertices, {
          render: {
            sprite: {
              texture: letterImage.src,
              xScale: scaleX,
              yScale: scaleY,
            },
          },
          className: LogoCSS["matter-box"],
          frictionAir: 0.03,
        });

        // Push the created letterBody into the array
        letterBodies.push(letterBody);
        x += letterSpacing;

        // Wrap the "<3" letter in a Link component
        if (letter.text === "<3") {
          letterBody.render.sprite.xScale = scaleX * 0.8;
          letterBody.render.sprite.xScale = scaleY * 0.9;
        }
        World.add(engine.world, [letterBody]);
      };
    }

    //  Create a constraint to allow dragging
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      element: matterContainerRef.current,
      constraint: {
        stiffness: 1,
        render: {
          visible: false,
        },
      },
    });
    World.add(engine.world, mouseConstraint);

    // Create the ceiling and boundaries
    const boundaryOptions = {
      isStatic: true,
      render: {
        visible: false,
      },
    };

    const ceiling = Bodies.rectangle(windowWidth / 2, 100, windowWidth, 10, boundaryOptions);
    const leftWall = Bodies.rectangle(0, windowHeight / 2, 10, windowHeight, boundaryOptions);
    const rightWall = Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, boundaryOptions);

    // Add the walls and ceiling to the world
    World.add(engine.world, [ceiling, leftWall, rightWall]);

    // Run the renderer
    Render.run(render);

    // Create a runner
    const runner = Runner.create();

    // Run the engine
    Matter.Runner.run(runner, engine);

    // Teleport each letter back to its original position if it goes out of bounds
    Matter.Events.on(engine, "afterUpdate", () => {
      for (const letterBody of letterBodies) {
        const { x, y } = letterBody.position;

        if (x < -10 || x > windowWidth || y > windowHeight * 1.35 || y < -250) {
          let randomNumber = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
          Matter.Body.setPosition(letterBody, { x: randomNumber, y: 1000 });
          Matter.Body.setVelocity(letterBody, { x: 0, y: 0 });
        }

        // Check if the letter has crossed the y threshold
        if (y > 800) {
          // Calculate the force components (x and y) based on the angle and magnitude
          const randomAngle = 2.7;
          let angleOffset = 1 + 1;

          const adjustedAngle = randomAngle + angleOffset;
          const randomForceMagnitude = Math.random() * 0.1;

          // Calculate the force components (x and y) based on the adjusted angle and magnitude
          const forceX = Math.cos(adjustedAngle) * randomForceMagnitude;
          const forceY = Math.sin(adjustedAngle) * randomForceMagnitude;

          // Apply the force to the letter body
          Matter.Body.applyForce(letterBody, { x, y }, { x: forceX, y: forceY });
        }
      }
    });

    // Add a resize event listener
    const handleResize = () => {
      const newWindowWidth = matterContainerRef.current.clientWidth;
      const newWindowHeight = matterContainerRef.current.clientHeight;

      // Update the boundaries with the new window dimensions
      updateBoundaries(engine, newWindowWidth, newWindowHeight);

      // // // Update the canvas size
      // render.canvas.width = newWindowWidth;
      // render.canvas.height = newWindowHeight;

      // Update the scaling of letter bodies
      for (const letter of letters) {
        const { scaleX, scaleY } = letter;
        for (const letterBody of letterBodies) {
          if (letterBody.render.sprite.texture === letter.sprite) {
            letterBody.render.sprite.xScale = scaleX;
            letterBody.render.sprite.yScale = scaleY;
          }
        }
      }
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Update all the boundaries. This gets called on resize
    const updateBoundaries = (engine, windowWidth, windowHeight) => {
      const boundaryOptions = {
        isStatic: true,
        render: {
          visible: false,
        },
      };

      const ceiling = Bodies.rectangle(windowWidth / 2, 0, windowWidth, 10, boundaryOptions);
      const leftWall = Bodies.rectangle(0, windowHeight / 2, 10, windowHeight, boundaryOptions);
      const rightWall = Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, boundaryOptions);

      // Remove the existing boundaries from the world
      World.remove(engine.world, [ceiling, leftWall, rightWall]);

      // Add the updated boundaries to the world
      World.add(engine.world, [ceiling, leftWall, rightWall]);
    };

    return () => {
      // Stop the renderer and clear all eventlisteners on unmount
      Matter.Render.stop(render);
      window.removeEventListener("resize", handleResize);

      const container = matterContainerRef.current;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div ref={matterContainerRef} className={LogoCSS.container}></div>;
};

export default Logo;

import React, { useEffect, forwardRef } from "react";
import Matter from "matter-js";

const Test = forwardRef(({ matterContainerRef }, ref) => {
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

    console.log(matterContainerRef);

    // Window dimensions, width declareances
    const windowWidth = matterContainerRef.current.clientWidth;
    const windowHeight = matterContainerRef.current.clientHeight;
    const desiredWidth = 900;
    const desiredHeight = 1050;
    let scaledImageWidth, scaledImageHeight;

    // Declare letterBody, array and sizes
    let letterBody;
    const letterBodies = [];

    // Create an engine
    const engine = Engine.create();
    engine.gravity.y = -0.3;

    console.log(document.getElementById("svg_path1"));

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
      { text: "Z", sprite: "Z.svg", x: 230, y: 900, angle: 0 },
      { text: "A", sprite: "A.svg", x: 230, y: 900, angle: 0 },
      { text: "A", sprite: "A2.svg", x: 230, y: 900, angle: 0 },
      { text: "R", sprite: "R.svg", x: 230, y: 900, angle: 0 },
    ];

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

    return () => {
      // Stop the renderer and clear all eventlisteners on unmount
      Matter.Render.stop(render);

      const container = matterContainerRef.current;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);
  return <div>Test</div>;
});

export default Test;
